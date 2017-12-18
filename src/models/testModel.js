export default (sequelize, DataTypes) => {
  const testModel = sequelize.define('testModel', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.TEXT,
  });
  return testModel;
};
