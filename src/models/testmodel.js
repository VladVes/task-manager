'use strict';
module.exports = (sequelize, DataTypes) => {
  var Testmodel = sequelize.define('Testmodel', {
    preview: DataTypes.TEXT,
    info: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Testmodel;
};