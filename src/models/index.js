var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(__filename);
var env = process.env.NODE_ENV || 'development';
var config = require('__dirname' + '/../../config/config.js')[env];
var db = {};
import getLogger from '../lib/log';

const log = getLogger('ORM');

if (config.use_env_var) {
  var sequelize = new Sequelize(process.env[config.use_env_var]);
  log(`connecting to DB by url`);
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
  log(`connecting to DB by using config file`);
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

module.exports = db;
