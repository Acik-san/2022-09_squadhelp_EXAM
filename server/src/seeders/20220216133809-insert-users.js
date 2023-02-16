const _ = require('lodash');
const bcrypt = require('bcrypt');
const CONSTANTS = require('../constants');

const generateUser = key => ({
  id: key,
  firstName: `Name${key}`,
  lastName: `Lastname${key}`,
  displayName: `Displayname${key}`,
  email: `user${key}@gmail.com`,
  passwordHash: bcrypt.hashSync('qwerty', bcrypt.genSaltSync(CONSTANTS.SALT_ROUNDS)),
  role: _.random(1, 10) > 5 ? 'customer' : 'creator',
});

const generateUsers = (amount) => {
  return new Array(amount > 50 ? 50 : amount)
    .fill(null)
    .map((e, i) => generateUser(i));
};
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', generateUsers(100), {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
