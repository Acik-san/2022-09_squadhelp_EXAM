const { Router } = require('express');
const chatMiddlewares = require('../middlewares/chatMiddlewares');
const chatController = require('../controllers/chatController');
const chatsRouter = Router();

chatsRouter
  .route('/catalogs')
  .post(chatController.createCatalog)
  .get(chatController.getCatalogs);

chatsRouter
  .route('/catalogs/:catalogId')
  .patch(chatController.updateNameCatalog)
  .post(chatController.addNewChatToCatalog)
  .delete(chatController.deleteCatalog);

chatsRouter.delete(
  '/catalogs/:catalogId/:chatId',
  chatController.removeChatFromCatalog
);

chatsRouter.post('/:recipient', chatController.addMessage);

chatsRouter.get('/:interlocutorId', chatController.getChat);

chatsRouter.get('/', chatController.getChats);

chatsRouter.patch(
  '/blackList',
  chatMiddlewares.addToListPrepare,
  chatController.addChatToBlackList
);

chatsRouter.patch(
  '/favorite',
  chatMiddlewares.addToListPrepare,
  chatController.addChatToFavorite
);

module.exports = chatsRouter;
