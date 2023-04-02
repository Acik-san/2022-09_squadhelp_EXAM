const CONSTANTS = require('../constants');
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'banks',
      [
        {
          cardNumber: CONSTANTS.SQUADHELP_BANK_NUMBER,
          name: CONSTANTS.SQUADHELP_BANK_NAME,
          expiry: CONSTANTS.SQUADHELP_BANK_EXPIRY,
          cvc: CONSTANTS.SQUADHELP_BANK_CVC,
          balance: 0,
        },
        {
          cardNumber: '4111111111111111',
          name: 'customer',
          expiry: '09/23',
          cvc: '505',
          balance: 5000,
        },
        {
          cardNumber: '4222222222222222',
          name: 'creator',
          expiry: '09/23',
          cvc: '500',
          balance: 0,
        },
      ],
      {}
    );
  },
};
