'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('TaskStatuses', [
      { name: 'undefined' },
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
