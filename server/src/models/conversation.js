'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Conversation extends Model {
    static associate (models) {
      Conversation.hasMany(models.Message, {
        foreignKey: 'conversationId',
        targetKey: 'id',
      });
      Conversation.hasMany(models.UserToConversation, {
        foreignKey: 'conversationId',
        targetKey: 'id',
      });
      Conversation.belongsToMany(models.User, {
        through: 'users_to_conversations',
        foreignKey: 'conversationId',
      });
      Conversation.belongsToMany(models.Catalog, {
        through: 'catalogs_to_conversations',
        foreignKey: 'conversationId',
      });
    }
  }
  Conversation.init(
    {},
    {
      sequelize,
      modelName: 'Conversation',
      tableName: 'conversations',
      timestamps: true,
    }
  );
  return Conversation;
};
