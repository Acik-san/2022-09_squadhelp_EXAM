const { Offer, Contest, User } = require("../models")
const controller = require('../socketInit');
const sendMail = require("../utils/nodemailer");

module.exports.getOffersForModerator = async (req, res, next) => {
  try {
    const { query: { limit, offset } } = req
    const offers = await Offer.findAll({
      where: { status: "pending", moderateStatus: "pending" }, order: [['id', 'ASC']],
      limit: limit > 8 || limit <= 0 ? 8 : limit,
      offset: offset ? offset : 0,
      include: [
        {
          model: Contest,
          attributes: ["contestType", "userId"]
        },
        {
          model: User,
          attributes: ["avatar", "firstName", "lastName", "email", "rating"]
        },]
    })
    const haveMore = offers.length > 0 ? true : false;
    res.status(200).send({ data: { offers, haveMore } })
  } catch (error) {
    next(error)
  }
}

module.exports.setModerateOfferStatus = async (req, res, next) => {
  try {
    const { body: { customerId, status }, offer, message } = req
    const offerId = await offer.update({ moderateStatus: status })
    if (status === 'confirmed') {
      controller.getNotificationController().emitEntryCreated(Number(customerId))
    }
    sendMail(message)
    res.status(200).send({ data: offerId.id })
  } catch (error) {
    next(error)
  }
}