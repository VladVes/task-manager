'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('TaskStatuses', [
      { name: 'undefined (you should create new status)' },
      { name: 'new' },
      { name: 'in work' },
      { name: 'on testing' },
      { name: 'finished' },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('TaskStatuses', null, {});
  }
};
