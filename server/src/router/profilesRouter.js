const { Router } = require('express');
const basicMiddlewares = require('../middlewares/basicMiddlewares');
const { checkToken, checkAuth } = require('../middlewares/checkToken');
const userController = require('../controllers/userController');
const upload = require('../utils/fileUpload');
const profilesRouter = Router();

profilesRouter
  .route('/')
  .get(checkAuth)
  .patch(checkToken, upload.uploadAvatar, userController.updateUser);

profilesRouter.post(
  '/cashout',
  checkToken,
  basicMiddlewares.onlyForCreative,
  userController.cashout
);

module.exports = profilesRouter;
