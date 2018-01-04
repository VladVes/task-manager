'use strict';
module.exports = (sequelize, DataTypes) => {
  var Tag = sequelize.define('Tag', {
    name: DataTypes.STRING,
    unique: true,
    validate: {
      notNull: true,
      notEmpty: true
    }
  });

  Tag.associate = models => models;

  return Tag;
};
