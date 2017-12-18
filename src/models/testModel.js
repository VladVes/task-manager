export default (sequelize, DataTypes) => {
  const testModel = sequelize.define('testModel', {
    id: DataTypes.INTEGER,
    name: DataTypes.TEXT,
  });
  return testModel;
};
