const express = require('express');
const basicMiddlewares = require('../middlewares/basicMiddlewares');
const mailMiddlewares = require('../middlewares/mailMiddlewares');
const chatMiddlewares = require('../middlewares/chatMiddlewares');
const hashPass = require('../middlewares/hashPassMiddle');
const userController = require('../controllers/userController');
const contestController = require('../controllers/contestController');
const checkToken = require('../middlewares/checkToken');
const validators = require('../middlewares/validators');
const chatController = require('../controllers/chatController');
const offerController = require('../controllers/offerController');
const upload = require('../utils/fileUpload');
const router = express.Router();

router.post(
  '/registration',
  validators.validateRegistrationData,
  hashPass,
  userController.registration
);

router.post('/login', validators.validateLogin, userController.login);

router.get('/profile', checkToken.checkAuth);

router.get('/contests/:contestId/:fileName', contestController.downloadFile);

router.use(checkToken.checkToken);

router.get('/startContest/:contestName', contestController.getDataForContest);

router.post(
  '/payment',
  basicMiddlewares.onlyForCustomer,
  upload.uploadContestFiles,
  basicMiddlewares.parseBody,
  validators.validateContestCreation,
  userController.payment
);

router.get(
  '/dashboard/customerContests',
  contestController.getCustomersContests
);

router.get(
  '/contests/:contestId',
  basicMiddlewares.canGetContest,
  contestController.getContestById
);

router.get(
  '/dashboard/creatorContests',
  basicMiddlewares.onlyForCreative,
  contestController.getCreativeContests
);

router.patch(
  '/contests/:contestId',
  upload.updateContestFile,
  contestController.updateContestById
);

router.post(
  '/contests/:contestId/offer',
  upload.uploadLogoFiles,
  basicMiddlewares.canSendOffer,
  contestController.setNewOffer
);

router.patch(
  '/contests/:contestId/offer',
  basicMiddlewares.onlyForCustomerWhoCreateContest,
  contestController.setOfferStatus
);

router.post(
  '/contests/:contestId/rating',
  basicMiddlewares.onlyForCustomer,
  userController.changeMark
);

router.patch('/profile', upload.uploadAvatar, userController.updateUser);

router.post(
  '/profile/cashout',
  basicMiddlewares.onlyForCreative,
  userController.cashout
);

router.post('/chats/:recipient', chatController.addMessage);

router.get('/chats/:interlocutorId', chatController.getChat);

router.get('/chats', chatController.getChats);

router.patch(
  '/chats/blackList',
  chatMiddlewares.addToListPrepare,
  chatController.addChatToBlackList
);

router.patch(
  '/chats/favorite',
  chatMiddlewares.addToListPrepare,
  chatController.addChatToFavorite
);

router.post('/catalogs', chatController.createCatalog);

router.patch('/catalogs/:catalogId', chatController.updateNameCatalog);

router.post('/catalogs/:catalogId', chatController.addNewChatToCatalog);

router.delete(
  '/catalogs/:catalogId/:chatId',
  chatController.removeChatFromCatalog
);

router.delete('/catalogs/:catalogId', chatController.deleteCatalog);

router.get('/catalogs', chatController.getCatalogs);

router.get('/offers', offerController.getOffersForModerator);

router.patch(
  '/offers/:id',
  basicMiddlewares.findOfferById,
  mailMiddlewares.messagePrepair,
  offerController.setModerateOfferStatus
);

module.exports = router;
