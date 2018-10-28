const Sequelize = require('sequelize');
const sequelize = require('../sequelize');

const Player = sequelize.define('player', {
  player_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  member_id: {
    type: Sequelize.INTEGER
  },
  position_pref_1: {
    type: Sequelize.STRING
  },
  position_pref_2: {
    type: Sequelize.STRING
  },
  league_id: {
    type: Sequelize.STRING
  },
  jersey_deposit: {
    type: Sequelize.STRING
  }
}, {
    timestamps: false
});

module.exports = Player