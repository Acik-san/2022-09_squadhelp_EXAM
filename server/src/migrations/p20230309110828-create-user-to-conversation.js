module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users_to_conversations', {
      conversationId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: { tableName: 'conversations' },
          key: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'restrict'
      },
      userId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: { tableName: 'users' },
          key: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'restrict'
      },
      blackList: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      favoriteList: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users_to_conversations');
  }
};