const { Offer, Contest, User } = require("../models")
const controller = require('../socketInit');

module.exports.getOffersForModerator = async (req, res, next) => {
  try {
    const offers = await Offer.findAll({
      where: { status: "pending", moderateStatus: "pending" }, order: [['id', 'ASC']], include: [
        { model: Contest },
        { model: User },]
    })

    res.status(200).send({ data: offers })
  } catch (error) {
    next(error)
  }
}

module.exports.setModerateOfferStatus = async (req, res, next) => {
  try {
    const { body: { customerId, status }, offer } = req
    const offerId = await offer.update({ moderateStatus: status })
    if (status === 'confirmed') {
      controller.getNotificationController().emitEntryCreated(Number(customerId))
    }
    res.status(200).send({ data: offerId.id })
  } catch (error) {
    next(error)
  }
}