module.exports = (sequelize, DataTypes) => {
  const TaskTag = sequelize.define('TaskTag', {
    status: DataTypes.STRING,
  });
  return TaskTag;
};
