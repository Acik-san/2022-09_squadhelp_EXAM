module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('catalogs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: { tableName: 'users' },
          key: 'id',
        },
      },
      catalogName: {
        allowNull: false,
        type: Sequelize.STRING(32),
      },
    });
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('catalogs');
  },
};
