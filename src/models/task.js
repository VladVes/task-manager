'use strict';
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    description: DataTypes.TEXT,
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    creator: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    assignedTo: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  Task.associate = (models) => {
    models.Task.belongsToMany(models.Tag, {through: 'TaskTag'});
    models.Tag.belongsToMany(models.Task, {through: 'TaskTag'});
  };

  return Task;
};
