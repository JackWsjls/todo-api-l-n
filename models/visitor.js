'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class visitor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  visitor.init({
    ip: DataTypes.STRING,
    address_detail: DataTypes.STRING,
    point: DataTypes.STRING,
    count: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'visitor',
  });
  return visitor;
};