'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserToConversation extends Model {
    static associate(models) {
      UserToConversation.belongsTo(models.Conversation, {
        foreignKey: 'conversationId',
        sourceKey: 'id'
      });
      UserToConversation.belongsTo(models.User, {
        foreignKey: 'userId',
        sourceKey: 'id'
      });
    }
  }
  UserToConversation.init({
    conversationId: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    userId: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    blackList: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    favoriteList: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
  }, {
    sequelize,
    modelName: 'UserToConversation',
    tableName: 'users_to_conversations',
    timestamps: true,
  });
  return UserToConversation;
};