var Sequelize = require('sequelize');
var env = process.env.NODE_ENV || 'development';
var config = require('__dirname' + '/../../config/config.js')[env];
import getLogger from '../lib/log';

const log = getLogger('ORM');

if (config.use_env_var) {
  var sequelize = new Sequelize(process.env[config.use_env_var]);
  log(`connecting to DB by url`);
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
  log(`connecting to DB by using config file`);
}

const testModel = sequelize.import('./testmodel.js');

export { testModel };
