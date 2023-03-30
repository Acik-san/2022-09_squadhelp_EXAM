'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    static associate (models) {
      Message.belongsTo(models.User, {
        foreignKey: 'sender',
        sourceKey: 'id',
      });
      Message.belongsTo(models.Conversation, {
        foreignKey: 'conversationId',
        sourceKey: 'id',
      });
    }
  }
  Message.init(
    {
      body: {
        allowNull: false,
        type: DataTypes.STRING(512),
      },
      sender: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      conversationId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: 'Message',
      tableName: 'messages',
      timestamps: true,
    }
  );
  return Message;
};
