export default (sequelize, DataTypes) => {
  const Testmodel = sequelize.define('Testmodel', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.TEXT,
  });
  return Testmodel;
};
