const { User, Conversation, UserToConversation, Message, Catalog } = require('../models');
const { findUser } = require('./queries/userQueries');
const { updateChatData, getChatData, getConversationIdList, createConversation } = require('./queries/chatQueries');
const controller = require('../socketInit');
const { getArrayOfValues } = require('../utils/functions');


module.exports.addMessage = async (req, res, next) => {
  try {
    const { params: { recipient }, body: { messageBody, interlocutor }, tokenData: { userId, firstName, lastName, displayName, avatar, email } } = req
    const participants = [userId, Number(recipient)].sort((participant1, participant2) => participant1 - participant2);
    const conversations = await Conversation.findAll({ include: [{ model: User, through: { where: { userId: participants } } }] });
    const conversationIdList = await getConversationIdList(conversations)
    const conversationId = conversationIdList.length > 0 ? conversationIdList.pop() : await createConversation(participants, User)
    const conversation = await Conversation.findAll({ where: { id: conversationId }, include: [{ model: UserToConversation, where: { conversationId } }] });
    const message = await Message.create({ sender: userId, body: messageBody, conversationId })
    const blackList = getArrayOfValues(conversation, 'UserToConversations', 'blackList')
    const favoriteList = getArrayOfValues(conversation, 'UserToConversations', 'favoriteList')
    message.dataValues.participants = participants;
    const interlocutorId = participants.filter(
      (participant) => participant !== userId)[0];
    const preview = {
      id: conversationId,
      sender: userId,
      text: messageBody,
      createdAt: message.createdAt,
      participants,
      blackList,
      favoriteList,
    };
    controller.getChatController().emitNewMessage(interlocutorId, {
      message,
      preview: {
        ...preview,
        interlocutor: {
          id: userId,
          firstName,
          lastName,
          displayName,
          avatar,
          email,
        },
      },
    });
    res.status(200).send({
      message,
      preview: { ...preview, interlocutor },
    });
  } catch (error) {
    next(error)
  }
};

module.exports.getChat = async (req, res, next) => {
  try {
    const { params: { interlocutorId }, tokenData: { userId } } = req
    const participants = [userId, Number(interlocutorId)].sort((participant1, participant2) => participant1 - participant2);
    const conversations = await Conversation.findAll({ include: [{ model: User, through: { where: { userId: participants } } }, { model: UserToConversation }] });
    const conversationIdList = await getConversationIdList(conversations)
    const chatData = {}
    conversations.flatMap(({ UserToConversations }) => UserToConversations).map(({ dataValues }) => dataValues).filter(({ conversationId }) => conversationId === conversationIdList[0]).sort((conversationData1, conversationData2) => conversationData1.userId - conversationData2.userId).forEach(({ conversationId, userId, blackList, favoriteList }, i, arr) => {
      if (conversationId === arr[i + 1]?.conversationId) {
        Object.assign(chatData, { id: conversationId, participants: [userId, arr[i + 1].userId], blackList: [blackList, arr[i + 1].blackList], favoriteList: [favoriteList, arr[i + 1].favoriteList] })
      }
    })
    const messages = await Message.findAll({ where: { sender: participants, conversationId: conversationIdList[0] }, order: [['createdAt', 'ASC']] });
    const interlocutor = await findUser({ id: Number(interlocutorId) });
    res.send({
      messages,
      interlocutor: {
        firstName: interlocutor.firstName,
        lastName: interlocutor.lastName,
        displayName: interlocutor.displayName,
        id: interlocutor.id,
        avatar: interlocutor.avatar,
      },
      chatData
    });

  } catch (error) {
    next(error)
  }
};

module.exports.getChats = async (req, res, next) => {
  try {
    const { tokenData: { userId } } = req
    const user = await User.findAll({ where: { id: userId }, include: [{ model: Conversation, attributes: ['id'], include: [{ model: Message, order: [['createdAt', 'ASC']] }] }] })
    const usersToConversations = await UserToConversation.findAll({ where: { conversationId: getArrayOfValues(user, 'Conversations', 'id') } })
    const messagesData = user.flatMap(({ Conversations }) => Conversations).map(({ Messages }) => Messages.pop()).map(({ dataValues: { conversationId, sender, body, createdAt } }) => ({ id: conversationId, sender, text: body, createdAt }))
    const conversationData = []
    usersToConversations.map(({ dataValues: { conversationId, userId, blackList, favoriteList } }) => ({ id: conversationId, userId, blackList, favoriteList })).sort((conversationData1, conversationData2) => conversationData1.id === conversationData2.id ? conversationData1.userId - conversationData2.userId : conversationData1.id - conversationData2.id).forEach(({ id, userId, blackList, favoriteList }, i, arr) => {
      if (id === arr[i + 1]?.id) {
        conversationData.push({ id, participants: [userId, arr[i + 1].userId], blackList: [blackList, arr[i + 1].blackList], favoriteList: [favoriteList, arr[i + 1].favoriteList] })
      }
    })
    const chats = []
    conversationData.concat(messagesData).sort((chatData1, chatData2) => chatData1.id - chatData2.id).forEach((chatData, i, arr) => {
      if (chatData.id === arr[i + 1]?.id) {
        chats.push(Object.assign(chatData, arr[i + 1]))
      }
    })
    const interlocutors = await User.findAll({
      where: {
        id: chats.flatMap(({ participants }) => participants.filter(id => id !== userId)),
      },
      attributes: ['id', 'firstName', 'lastName', 'displayName', 'avatar'],
    })
    chats.forEach((conversation) => {
      interlocutors.forEach(interlocutor => {
        const { dataValues: { id, firstName, lastName, displayName, avatar } } = interlocutor
        if (conversation.participants.includes(id)) {
          conversation.interlocutor = {
            id,
            firstName,
            lastName,
            displayName,
            avatar,
          };
        }
      });
    });
    res.send(chats);
  } catch (error) {
    next(error)
  }
};

module.exports.addChatToBlackList = async (req, res, next) => {
  try {
    const { body: { participants, blackListFlag, conversationId }, tokenData: { userId } } = req
    await updateChatData({ blackList: blackListFlag }, { where: { conversationId, userId } })
    const chat = await getChatData(conversationId, participants)
    res.send(chat);
    const interlocutorId = participants.filter(
      (participant) => participant !== userId)[0];
    controller.getChatController().emitChangeBlockStatus(interlocutorId, chat);
  } catch (err) {
    next(err);
  }
};

module.exports.addChatToFavorite = async (req, res, next) => {
  try {
    const { body: { participants, favoriteFlag, conversationId }, tokenData: { userId } } = req
    await updateChatData({ favoriteList: favoriteFlag }, { where: { conversationId, userId } })
    const chat = await getChatData(conversationId, participants)
    res.send(chat);
  } catch (err) {
    next(err);
  }
};

module.exports.createCatalog = async (req, res, next) => {
  try {
    const { body: { catalogName, chatId }, tokenData: { userId } } = req
    const newCatalog = await Catalog.create({ userId, catalogName }, { returning: true })
    const conversation = await Conversation.findByPk(chatId)
    await newCatalog.addConversation(conversation)
    const catalog = { chats: [chatId], userId, catalogName, id: chatId }
    res.send(catalog);
  } catch (err) {
    next(err);
  }
};

module.exports.updateNameCatalog = async (req, res, next) => {
  try {
    const { params: { catalogId }, body: { catalogName, chats } } = req
    const updatedCatalog = await Catalog.update({ catalogName }, { where: { id: Number(catalogId) }, returning: true })
    const catalog = updatedCatalog.flat().pop().dataValues
    delete catalog.id
    catalog.id = Number(catalogId)
    catalog.chats = chats
    res.send(catalog);
  } catch (err) {
    next(err);
  }
};

module.exports.addNewChatToCatalog = async (req, res, next) => {
  try {
    const { params: { catalogId }, body: { chatId } } = req
    const catalog = await Catalog.findByPk(Number(catalogId))
    const conversation = await Conversation.findByPk(chatId)
    await catalog.addConversation(conversation)
    res.end()
  } catch (err) {
    next(err);
  }
};

module.exports.removeChatFromCatalog = async (req, res, next) => {
  try {
    const { params: { catalogId, chatId } } = req
    const catalog = await Catalog.findByPk(Number(catalogId))
    const { dataValues: { catalogName } } = catalog
    const conversation = await Conversation.findByPk(Number(chatId))
    await catalog.removeConversation(conversation)
    const conversations = await catalog.getConversations()
    const currentCatalog = { id: Number(catalogId), chats: [...conversations.map(({ catalogs_to_conversations: { dataValues: { conversationId } } }) => conversationId)], catalogName }
    res.send(currentCatalog);
  } catch (err) {
    next(err);
  }
};

module.exports.deleteCatalog = async (req, res, next) => {
  try {
    const { params: { catalogId } } = req
    const catalog = await Catalog.findByPk(Number(catalogId))
    await catalog.destroy()
    res.end();
  } catch (err) {
    next(err);
  }
};

module.exports.getCatalogs = async (req, res, next) => {
  try {
    const { tokenData: { userId } } = req;
    const userCatalogs = await Catalog.findAll({ where: { userId }, include: [{ model: Conversation, through: { attributes: ['conversationId', 'catalogId'] } }] });
    const emptyCatalogs = userCatalogs.filter(({ Conversations }) => Conversations.length === 0).map(({ dataValues: { id, catalogName } }) => ({ id, catalogName, chats: [] }));
    const catalogMap = userCatalogs.reduce((acc, { Conversations }, i, arr) => {
      Conversations.forEach(({ catalogs_to_conversations: { dataValues: { catalogId, conversationId } } },) => {
        acc[catalogId] = acc[catalogId] || { chats: [], catalogName: arr[i].dataValues.catalogName };
        acc[catalogId].chats.push(conversationId);
      });
      return acc;
    }, {});
    const catalogs = Object.values(catalogMap).map(({ catalogName, chats }, i) => ({ id: i + 1, catalogName, chats }));
    catalogs.push(...emptyCatalogs);
    res.send(catalogs);
  } catch (err) {
    next(err);
  }
};
