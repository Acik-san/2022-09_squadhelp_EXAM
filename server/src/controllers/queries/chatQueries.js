const { Conversation, UserToConversation } = require('../../models');
const ServerError = require('../../errors/ServerError');

module.exports.createConversation = async (participants, User) => {
  const newConversation = await Conversation.create({});
  for (const id of participants) {
    const user = await User.findByPk(id);
    await user.addConversation(newConversation);
  }
  return newConversation.dataValues.id;
};

module.exports.updateChatData = async (values, options) => {
  await UserToConversation.update(values, options);
};

module.exports.getChatData = async (conversationId, participants) => {
  const usersToConversations = await UserToConversation.findAll({
    where: { conversationId, userId: participants },
  });
  const chat = {};
  usersToConversations
    .map(
      ({
        dataValues: { conversationId, userId, blackList, favoriteList },
      }) => ({ id: conversationId, userId, blackList, favoriteList })
    )
    .sort(
      (conversationData1, conversationData2) =>
        conversationData1.userId - conversationData2.userId
    )
    .forEach(({ id, blackList, favoriteList }, i, arr) => {
      if (id === arr[i + 1]?.id) {
        Object.assign(chat, {
          id,
          participants,
          blackList: [blackList, arr[i + 1].blackList],
          favoriteList: [favoriteList, arr[i + 1].favoriteList],
        });
      }
    });
  return chat;
};

module.exports.getConversationIdList = conversations => {
  const conversationIdList = conversations
    .flatMap(({ Users }) => Users)
    .map(
      ({
        dataValues: {
          users_to_conversations: {
            dataValues: { conversationId },
          },
        },
      }) => conversationId
    )
    .filter((id, i, arr) => arr.indexOf(id) !== i);
  return conversationIdList;
};
