const { Router } = require('express');
const basicMiddlewares = require('../middlewares/basicMiddlewares');
const contestController = require('../controllers/contestController');
const dashboardsRouter = Router();

dashboardsRouter.get(
  '/customerContests',
  contestController.getCustomersContests
);
dashboardsRouter.get(
  '/creatorContests',
  basicMiddlewares.onlyForCreative,
  contestController.getCreativeContests
);

module.exports = dashboardsRouter;
