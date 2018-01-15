import fs from 'fs';
import path from 'path';

const basename  = path.basename(__filename);

export default (queryInterface, Sequelize) => {
  let migrations = {};
  fs
    .readdirSync(__dirname)
    .filter(file => {
      return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
      migrations[file] = require(path.join(__dirname, file));
    });

    for (const table in migrations) {
      migrations[table].up(queryInterface, Sequelize);
    }
};
