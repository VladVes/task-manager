import fs from 'fs';
import path from 'path';

const dir = './migrations';
export default (queryInterface, Sequelize) => {
  const migrations = {};
  fs
    .readdirSync(dir)
    .filter(file => file.indexOf('.') !== 0 && file.slice(-3) === '.js')
    .forEach((file) => {
      migrations[file] = require(path.join(__dirname, '..', '..', dir, file), 'utf8'); //eslint-disable-line
    });

  Object.keys(migrations).forEach(table => migrations[table].up(queryInterface, Sequelize));
};
