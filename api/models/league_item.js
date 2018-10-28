const Sequelize = require('sequelize');
const sequelize = require('../sequelize');

const League_Item = sequelize.define('league_item', {
  league_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  item_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  }
}, {
    timestamps: false
});

module.exports = League_Item