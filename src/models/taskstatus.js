'use strict';
module.exports = (sequelize, DataTypes) => {
  const TaskStatus = sequelize.define('TaskStatus', {
    name: DataTypes.STRING,
    validate: {
      notNull: true,
      notEmpty: true
    }
  });

  TaskStatus.associate = models => models;

  return TaskStatus;
};
