const Sequelize = require('sequelize');
const sequelize = require('../sequelize');

const Transaction_Items = sequelize.define('transaction_item', {
  transaction_item_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    transaction_id: {
      type: Sequelize.INTEGER
    },
    item_id: {
      type: Sequelize.INTEGER
    },
    item_price: {
      type: Sequelize.FLOAT
    },
    item_discount: {
      type: Sequelize.FLOAT,
      defaultValue: 0
    }
  }, {
      timestamps: false
  });
  
  module.exports = Transaction_Items