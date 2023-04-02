const { Router } = require('express');
const basicMiddlewares = require('../middlewares/basicMiddlewares');
const userController = require('../controllers/userController');
const validators = require('../middlewares/validators');
const upload = require('../utils/fileUpload');
const paymentsRouter = Router();

paymentsRouter.post(
  '/',
  basicMiddlewares.onlyForCustomer,
  upload.uploadContestFiles,
  basicMiddlewares.parseBody,
  validators.validateContestCreation,
  userController.payment
);

module.exports = paymentsRouter;
