import fs from 'fs';
import path from 'path';

const dir  = './migrations';
export default (queryInterface, Sequelize) => {
  let migrations = {};
  fs
    .readdirSync(dir)
    .filter(file => {
      return (file.indexOf('.') !== 0) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
      migrations[file] = require(path.join(__dirname, '..', '..', dir, file));
    });

    for (const table in migrations) {
      migrations[table].up(queryInterface, Sequelize);
    }
};
