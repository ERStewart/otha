const Sequelize = require('sequelize');
const sequelize = require('../sequelize');

const Item = sequelize.define('item', {
  item_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  item_name: {
    type: Sequelize.INTEGER
  },
  item_desc: {
    type: Sequelize.FLOAT
  },
  item_price: {
    type: Sequelize.FLOAT
  }
}, {
    timestamps: false
});

module.exports = Item