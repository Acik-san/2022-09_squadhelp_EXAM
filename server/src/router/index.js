const { Router } = require('express');
const hashPass = require('../middlewares/hashPassMiddle');
const userController = require('../controllers/userController');
const { checkToken } = require('../middlewares/checkToken');
const validators = require('../middlewares/validators');
const router = Router();
const profilesRouter = require('./profilesRouter');
const contestsRouter = require('./contestsRouter');
const startContestsRouter = require('./startContestsRouter');
const dashboardsRouter = require('./dashboardsRouter');
const paymentsRouter = require('./paymentsRouter');
const chatsRouter = require('./chatsRouter');
const offersRouter = require('./offersRouter');

router.post(
  '/registration',
  validators.validateRegistrationData,
  hashPass,
  userController.registration
);

router.post('/login', validators.validateLogin, userController.login);

router.use('/profile', profilesRouter);
router.use('/contests', contestsRouter);
router.use(checkToken);
router.use('/startContest', startContestsRouter);
router.use('/dashboard', dashboardsRouter);
router.use('/payment', paymentsRouter);
router.use('/chats', chatsRouter);
router.use('/offers', offersRouter);

module.exports = router;
