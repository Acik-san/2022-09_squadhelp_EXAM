module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('catalogs_to_conversations', {
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
      catalogId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: { tableName: 'catalogs' },
          key: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'restrict'
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
    await queryInterface.dropTable('catalogs_to_conversations');
  }
};