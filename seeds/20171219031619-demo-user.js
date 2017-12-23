'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
        firstName: 'John',
        lastName: 'Doe',
        email: 'doe@mail.com',
        passwordDigest: '123dddeeefff'
      },
      {
        firstName: 'Maria',
        lastName: 'Zalman',
        email: 'zalman@mail.com',
        passwordDigest: '123dddeeefff'
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
