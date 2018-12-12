const Sequelize = require('sequelize');
const sequelize = require('../sequelize');

const Season_Player = sequelize.define('season_player', {
  player_id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  season_id: {
    type: Sequelize.INTEGER
  }
}, {
    timestamps: false
});

module.exports = Season_Player