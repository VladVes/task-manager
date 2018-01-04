'use strict';
module.exports = (sequelize, DataTypes) => {
  const TaskStatus = sequelize.define('TaskStatus', {
    name: DataTypes.STRING
  });

  TaskStatus.associate = models => models;

  return TaskStatus;
};
