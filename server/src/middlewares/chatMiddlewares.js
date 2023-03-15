const { getConversationIdList } = require('../controllers/queries/chatQueries');
const { Conversation, User } = require('../models');

module.exports.addToListPrepare = async (req, res, next) => {
  try {
    const { body: { participants } } = req
    const conversations = await Conversation.findAll({ include: [{ model: User, through: { where: { userId: participants } } }] });
    const conversationId = getConversationIdList(conversations).pop()
    req.body.conversationId = conversationId
    next()
  } catch (error) {
    next(error)
  }
}