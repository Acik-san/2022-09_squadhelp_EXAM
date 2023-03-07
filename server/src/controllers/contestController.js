const db = require('../models');
const ServerError =require('../errors/ServerError');
const contestQueries = require('./queries/contestQueries');
const userQueries = require('./queries/userQueries');
const controller = require('../socketInit');
const UtilFunctions = require('../utils/functions');
const CONSTANTS = require('../constants');
const {CONTEST_TYPES:{NAME_STYLE,TYPE_OF_NAME,TYPE_OF_TAGLINE,BRAND_STYLE,INDUSTRY},CONTEST_NAMES:{CONTEST_NAME,CONTEST_TAGLINE,CONTEST_LOGO}} = CONSTANTS

module.exports.getDataForContest = async (req, res, next) => {
 try { 
  const {params:{contestName}}=req
  const response = {};
  const types = contestName===CONTEST_NAME ? [NAME_STYLE, TYPE_OF_NAME, INDUSTRY]: contestName===CONTEST_TAGLINE ? [TYPE_OF_TAGLINE, INDUSTRY] :contestName===CONTEST_LOGO? [BRAND_STYLE, INDUSTRY]:[INDUSTRY]
    const characteristics = await db.Select.findAll({
      where: {
        type: {
          [ db.Sequelize.Op.or ]: types,
        },
      },
    });
    if (!characteristics) {
      return next(new ServerError());
    }
    characteristics.forEach(characteristic => {
      if (!response[ characteristic.type ]) {
        response[ characteristic.type ] = [];
      }
      response[ characteristic.type ].push(characteristic.describe);
    });
    res.send(response);
  } catch (err) {
    console.log(err);
    next(new ServerError('cannot get contest preferences'));
  }
};

module.exports.getContestById = async (req, res, next) => {
  try {
    const {params:{contestId},tokenData:{role,userId}} = req
    let contestInfo = await db.Contest.findOne({
      where: { id: contestId },
      order: [
        [db.Offer, 'id', 'asc'],
      ],
      include: [
        {
          model: db.User,
          required: true,
          attributes: {
            exclude: [
              'password',
              'role',
              'balance',
              'accessToken',
            ],
          },
        },
        {
          model: db.Offer,
          required: false,
          where: role === CONSTANTS.CREATOR
            ? { userId: req.tokenData.userId }
            : { moderateStatus: "confirmed" },
          attributes: { exclude: ['userId', 'contestId'] },
          include: [
            {
              model: db.User,
              required: true,
              attributes: {
                exclude: [
                  'password',
                  'role',
                  'balance',
                  'accessToken',
                ],
              },
            },
            {
              model: db.Rating,
              required: false,
              where: { userId: userId },
              attributes: { exclude: ['userId', 'offerId'] },
            },
          ],
        },
      ],
    });
    contestInfo = contestInfo.get({ plain: true });
    contestInfo.Offers.forEach(offer => {
      if (offer.Rating) {
        offer.mark = offer.Rating.mark;
      }
      delete offer.Rating;
    });
    res.send(contestInfo);
  } catch (e) {
    next(new ServerError());
  }
};

module.exports.downloadFile = async (req, res, next) => {
  const {params:{fileName}} = req
  const file = `${CONSTANTS.CONTESTS_DEFAULT_DIR}${fileName}`;
  res.download(file);
};

module.exports.updateContestById = async (req, res, next) => {
  if (req.file) {
    req.body.fileName = req.file.filename;
    req.body.originalFileName = req.file.originalname;
  }
  const {params:{contestId},body,tokenData:{userId}} = req;
  try {
    const updatedContest = await contestQueries.updateContest(body, {
      id: contestId,
      userId,
    });
    res.send(updatedContest);
  } catch (e) {
    next(e);
  }
};

module.exports.setNewOffer = async (req, res, next) => {
  try { 
    const {params:{contestId},body:{contestType,offerData,customerId},tokenData:{userId}} = req
   const obj = {};
    if (contestType === CONSTANTS.LOGO_CONTEST) {
     obj.fileName = req.file.filename;
      obj.originalFileName = req.file.originalname;
    } else {
      obj.text = offerData;
    }
    obj.userId = userId;
    obj.contestId = contestId;
    const result = await contestQueries.createOffer(obj);
    delete result.contestId;
    delete result.userId;
    const User = Object.assign({}, req.tokenData, { id: userId });
    res.send(Object.assign({}, result, { User }));
  } catch (e) {
    return next(new ServerError());
  }
};

const rejectOffer = async (offerId, creatorId, contestId) => {
  const rejectedOffer = await contestQueries.updateOffer(
    { status: CONSTANTS.OFFER_STATUS_REJECTED }, { id: offerId });
  controller.getNotificationController().emitChangeOfferStatus(creatorId,
    'Someone of yours offers was rejected', contestId);
  return rejectedOffer;
};

const resolveOffer = async (
  contestId, creatorId, orderId, offerId, priority, transaction) => {
  const finishedContest = await contestQueries.updateContestStatus({
    status: db.sequelize.literal(`   CASE
            WHEN "id"=${ contestId }  AND "orderId"='${ orderId }' THEN '${ CONSTANTS.CONTEST_STATUS_FINISHED }'
            WHEN "orderId"='${ orderId }' AND "priority"=${ priority +
    1 }  THEN '${ CONSTANTS.CONTEST_STATUS_ACTIVE }'
            ELSE '${ CONSTANTS.CONTEST_STATUS_PENDING }'
            END
    `),
  }, { orderId }, transaction);
  await userQueries.updateUser(
    { balance: db.sequelize.literal('balance + ' + finishedContest.prize) },
    creatorId, transaction);
  const updatedOffers = await contestQueries.updateOfferStatus({
    status: db.sequelize.literal(` CASE
            WHEN "id"=${ offerId } THEN '${ CONSTANTS.OFFER_STATUS_WON }'
            ELSE '${ CONSTANTS.OFFER_STATUS_REJECTED }'
            END
    `),
  }, {
    contestId,
  }, transaction);
  transaction.commit();
  const arrayRoomsId = [];
  updatedOffers.forEach(offer => {
    if (offer.status === CONSTANTS.OFFER_STATUS_REJECTED && creatorId !==
      offer.userId) {
      arrayRoomsId.push(offer.userId);
    }
  });
  controller.getNotificationController().emitChangeOfferStatus(arrayRoomsId,
    'Someone of yours offers was rejected', contestId);
  controller.getNotificationController().emitChangeOfferStatus(creatorId,
    'Someone of your offers WIN', contestId);
  return updatedOffers[ 0 ].dataValues;
};

module.exports.setOfferStatus = async (req, res, next) => {
  const {params:{contestId},body:{command,offerId,creatorId,orderId,priority}} = req
  let transaction;
  if (command === 'reject') {
    try {
      const offer = await rejectOffer(offerId, creatorId, contestId);
      res.send(offer);
    } catch (err) {
      next(err);
    }
  } else if (command === 'resolve') {
    try {
      transaction = await db.sequelize.transaction();
      const winningOffer = await resolveOffer(contestId, creatorId, orderId, offerId,priority, transaction);
      res.send(winningOffer);
    } catch (err) {
      transaction.rollback();
      next(err);
    }
  }
};

module.exports.getCustomersContests = async (req, res, next) => {
  try {
  const {query:{limit,offset,contestStatus},tokenData:{userId}} =req
  const contests = await db.Contest.findAll({
    where: { status: contestStatus, userId },
    limit: limit > 8 || limit <=0 ? 8:limit,
    offset: offset ? offset : 0,
    order: [['id', 'DESC']],
    include: [
      {
        model: db.Offer,
        where: {moderateStatus: "confirmed"},
        required: false,
        attributes: ['id'],
      },
    ],
  })
  contests.forEach( contest => contest.dataValues.count = contest.dataValues.Offers.length);
  const haveMore = contests.length > 0 ? true : false;
  res.status(200).send({ contests, haveMore });
  } catch (error) {
    next(new ServerError(error));
  }
};

module.exports.getCreativeContests = async (req, res, next) => {
  try {
  const {query:{offset, limit, typeIndex, contestId, industry, awardSort, ownEntries},tokenData:{userId}}=req
  const predicates = UtilFunctions.createWhereForAllContests(typeIndex,
    contestId, industry, awardSort);
  const contests = await db.Contest.findAll({
    where: predicates.where,
    order: predicates.order,
    limit,
    offset: offset ? offset : 0,
    include: [
      {
        model: db.Offer,
        required: JSON.parse(ownEntries),
        where: JSON.parse(ownEntries) ? { userId } : {},
        attributes: ['id'],
      },
    ],
  })
  contests.forEach( contest => contest.dataValues.count = contest.dataValues.Offers.length);
  const haveMore = contests.length > 0 ? true : false;
  res.status(200).send({ contests, haveMore });
  } catch (error) {
    next(new ServerError());
  }
};
