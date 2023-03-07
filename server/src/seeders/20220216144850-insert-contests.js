const _ = require('lodash');
const { User } = require('../models');
const { v4: uuid } = require('uuid')


module.exports = {
  async up(queryInterface, Sequelize) {
    const users = await User.findAll({ where: { role: "customer" }, attributes: ['id'] })
    const generateContest = key => ({
      contestType: _.sample(['name', 'tagline', 'logo']),
      status: "finished",
      prize: 100,
      createdAt: _.sample(["2022-12-25 12:00:00+00", "2022-12-27 12:00:00+00", "2022-12-30 12:00:00+00", "2022-12-31 12:00:00+00", "2023-01-03 12:00:00+00", "2023-01-09 12:00:00+00", "2023-01-14 12:00:00+00", "2023-01-24 12:00:00+00", "2023-02-02 12:00:00+00", "2023-02-05 12:00:00+00",]),
      priority: 1,
      orderId: uuid(),
      userId: _.sample(users.map((user) => user.dataValues.id)),
    });

    const generateContests = (amount) => {
      return new Array(amount > 50 ? 50 : amount)
        .fill(null)
        .map((e, i) => generateContest(i));
    };
    await queryInterface.bulkInsert('contests', generateContests(50), {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('contests', null, {});
  },
};
