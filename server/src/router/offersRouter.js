const { Router } = require('express');
const basicMiddlewares = require('../middlewares/basicMiddlewares');
const mailMiddlewares = require('../middlewares/mailMiddlewares');
const offerController = require('../controllers/offerController');
const offersRouter = Router();

offersRouter.get('/', offerController.getOffersForModerator);

offersRouter.patch(
  '/:id',
  basicMiddlewares.findOfferById,
  mailMiddlewares.messagePrepair,
  offerController.setModerateOfferStatus
);
module.exports = offersRouter;
