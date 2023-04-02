const { Router } = require('express');
const basicMiddlewares = require('../middlewares/basicMiddlewares');
const { checkToken } = require('../middlewares/checkToken');
const contestController = require('../controllers/contestController');
const userController = require('../controllers/userController');
const upload = require('../utils/fileUpload');
const contestsRouter = Router();

contestsRouter.get('/:contestId/:fileName', contestController.downloadFile);

contestsRouter.use(checkToken);

contestsRouter
  .route('/:contestId')
  .get(basicMiddlewares.canGetContest, contestController.getContestById)
  .patch(upload.updateContestFile, contestController.updateContestById);

contestsRouter
  .route('/:contestId/offer')
  .post(
    upload.uploadLogoFiles,
    basicMiddlewares.canSendOffer,
    contestController.setNewOffer
  )
  .patch(
    basicMiddlewares.onlyForCustomerWhoCreateContest,
    contestController.setOfferStatus
  );

contestsRouter.post(
  '/:contestId/rating',
  basicMiddlewares.onlyForCustomer,
  userController.changeMark
);

module.exports = contestsRouter;
