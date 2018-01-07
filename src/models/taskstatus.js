'use strict';
module.exports = (sequelize, DataTypes) => {
  const TaskStatus = sequelize.define('TaskStatus', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING,
      validate: {
        notNull: true,
        notEmpty: true,
      },
    },
  });

  TaskStatus.associate = models => models;

  return TaskStatus;
};
