'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Catalog extends Model {
    static associate (models) {
      Catalog.belongsTo(models.User, {
        foreignKey: 'userId',
        sourceKey: 'id',
      });
      Catalog.belongsToMany(models.Conversation, {
        through: 'catalogs_to_conversations',
        foreignKey: 'catalogId',
      });
    }
  }
  Catalog.init(
    {
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      catalogName: {
        allowNull: false,
        type: DataTypes.STRING(32),
      },
    },
    {
      sequelize,
      modelName: 'Catalog',
      tableName: 'catalogs',
      timestamps: false,
    }
  );
  return Catalog;
};
