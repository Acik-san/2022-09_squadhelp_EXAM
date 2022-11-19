const express = require('express');
const basicMiddlewares = require('../middlewares/basicMiddlewares');
const hashPass = require('../middlewares/hashPassMiddle');
const userController = require('../controllers/userController');
const contestController = require('../controllers/contestController');
const checkToken = require('../middlewares/checkToken');
const validators = require('../middlewares/validators');
const chatController = require('../controllers/chatController');
const upload = require('../utils/fileUpload');
const router = express.Router();

router.post(
  '/registration',
  validators.validateRegistrationData,
  hashPass,
  userController.registration,
);

router.post(
  '/login',
  validators.validateLogin,
  userController.login,
);

router.get(
  '/getUser',
  checkToken.checkAuth,
);

router.use(checkToken.checkToken)

router.get(
  '/startContest/:contestName',
  contestController.getDataForContest,
);

router.post(
  '/pay',
  
  basicMiddlewares.onlyForCustomer,
  upload.uploadContestFiles,
  basicMiddlewares.parseBody,
  validators.validateContestCreation,
  userController.payment,
);

router.get(
  '/dashboard/customerContests',
  contestController.getCustomersContests,
);

router.get(
  '/contests/:contestId',
  basicMiddlewares.canGetContest,
  contestController.getContestById,
);

router.get(
  '/dashboard/creatorContests',
  basicMiddlewares.onlyForCreative,
  contestController.getCreativeContests,
);

router.get(
  '/downloadFile/:fileName',
  
  contestController.downloadFile,
);

router.patch(
  '/contests/:contestId',
  upload.updateContestFile,
  contestController.updateContestById,
);

router.post(
  '/setNewOffer',
  
  upload.uploadLogoFiles,
  basicMiddlewares.canSendOffer,
  contestController.setNewOffer,
);

router.post(
  '/setOfferStatus',
  
  basicMiddlewares.onlyForCustomerWhoCreateContest,
  contestController.setOfferStatus,
);

router.post(
  '/changeMark',
  
  basicMiddlewares.onlyForCustomer,
  userController.changeMark,
);

router.post(
  '/updateUser',
  
  upload.uploadAvatar,
  userController.updateUser,
);

router.post(
  '/cashout',
  
  basicMiddlewares.onlyForCreative,
  userController.cashout,
);

router.post(
  '/newMessage',
  
  chatController.addMessage,
);

router.post(
  '/getChat',
  
  chatController.getChat,
);

router.post(
  '/getPreview',
  
  chatController.getPreview,
);

router.post(
  '/blackList',
  
  chatController.blackList,
);

router.post(
  '/favorite',
  
  chatController.favoriteChat,
);

router.post(
  '/catalogs',
  chatController.createCatalog,
);

router.patch(
  '/catalogs/:catalogId',
  chatController.updateNameCatalog,
);

router.post(
  '/catalogs/:catalogId',
  chatController.addNewChatToCatalog,
);

router.delete(
  '/catalogs/:catalogId/:chatId',
  chatController.removeChatFromCatalog,
);

router.delete(
  '/catalogs/:catalogId',
  chatController.deleteCatalog,
);

router.get(
  '/catalogs',
  chatController.getCatalogs,
);

module.exports = router;
