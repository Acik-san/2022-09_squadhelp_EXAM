module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'banks',
      [
        {
          cardNumber: '4564654564564564',
          name: 'SquadHelp',
          expiry: '11/22',
          cvc: '453',
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
