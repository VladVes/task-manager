'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Testmodels', [{
        preview: 'Db migration',
        info: 'Hellow from DB!'
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Testmodels', null, {});
  }
};
