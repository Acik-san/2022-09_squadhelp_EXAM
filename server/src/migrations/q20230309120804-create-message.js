module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('messages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      body: {
        allowNull: false,
        type: Sequelize.STRING(512),
      },
      sender: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: { tableName: 'users' },
          key: 'id',
        },
      },
      conversationId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: { tableName: 'conversations' },
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('messages');
  }
};