const Sequelize = require('sequelize');
const sequelize = require('../sequelize');

const Season_Item = sequelize.define('season_item', {
  season_id: {
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

module.exports = Season_Item