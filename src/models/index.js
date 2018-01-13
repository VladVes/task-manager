import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import dotenv from 'dotenv';
import getLogger from '../lib/log';
import dbInit from '../../migrations';

dotenv.config();
const basename  = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
let config = require('__dirname' + '/../../config/config.js')[env];
let db = {};

const log = getLogger('ORM');

if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable]);
  log(`connecting to DB by url`);
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
  log(`connecting to DB by using config file`);
}

if (env == 'test') {
  dbInit(sequelize.queryInterface, Sequelize);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Op = Sequelize.Op;

module.exports = db;
