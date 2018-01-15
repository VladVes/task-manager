module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    description: DataTypes.TEXT,
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
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
    models.Task.belongsToMany(models.Tag, { through: 'TaskTag' });
    models.Tag.belongsToMany(models.Task, { through: 'TaskTag' });
    models.Task.belongsTo(models.User, { foreignKey: 'assignedTo' });
    models.Creator = models.Task.belongsTo(models.User, { as: 'Creator', foreignKey: 'creator' }); //eslint-disable-line
    models.Task.belongsTo(models.TaskStatus, { foreignKey: 'status' });
  };

  return Task;
};
