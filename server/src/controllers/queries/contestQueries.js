const db = require('../../models');
const ServerError = require('../../errors/ServerError');

module.exports.updateContest = async (data, predicate, transaction) => {
  const [updatedCount, [updatedContest]] = await db.Contest.update(data,
    { where: predicate, returning: true, transaction });
  if (updatedCount !== 1) {
    throw new ServerError('cannot update Contest');
  } else {
    return updatedContest.dataValues;
  }
};

module.exports.updateContestStatus = async (data, predicate, transaction) => {
  const updateResult = await db.Contest.update(data,
    { where: predicate, returning: true, transaction });
  if (updateResult[ 0 ] < 1) {
    throw new ServerError('cannot update Contest');
  } else {
    return updateResult[ 1 ][ 0 ].dataValues;
  }
};

module.exports.updateOffer = async (data, predicate, transaction) => {
  const [updatedCount, [updatedOffer]] = await db.Offer.update(data,
    { where: predicate, returning: true, transaction });
  if (updatedCount !== 1) {
    throw new ServerError('cannot update offer!');
  } else {
    return updatedOffer.dataValues;
  }
};

module.exports.updateOfferStatus = async (data, predicate, transaction) => {
  const result = await db.Offer.update(data,
    { where: predicate, returning: true, transaction });
  if (result[ 0 ] < 1) {
    throw new ServerError('cannot update offer!');
  } else {
    return result[ 1 ];
  }
};

module.exports.createOffer = async (data) => {
  const result = await db.Offer.create(data);
  if (!result) {
    throw new ServerError('cannot create new Offer');
  } else {
    return result.get({ plain: true });
  }
};
