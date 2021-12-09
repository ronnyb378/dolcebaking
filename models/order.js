'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.User)
    }
  };
  Order.init({
    orderId: DataTypes.STRING,
    products: DataTypes.JSON,
    itemDetail: DataTypes.JSON,
    cart: DataTypes.JSON,
    cartValues: DataTypes.JSON,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order; 
};