const { Router } = require('express');
const contestController = require('../controllers/contestController');
const startContestsRouter = Router();

startContestsRouter.get('/:contestName', contestController.getDataForContest);

module.exports = startContestsRouter;
