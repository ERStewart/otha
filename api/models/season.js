const Sequelize = require('sequelize');
const sequelize = require('../sequelize');

const Season = sequelize.define('season', {
  season_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  league_id: {
    type: Sequelize.INTEGER
  },
  season_name: {
    type: Sequelize.STRING
  },
  registration_open_date: {
    type: Sequelize.DATEONLY
  },
  registration_close_date: {
    type: Sequelize.DATEONLY
  },
  start_date: {
    type: Sequelize.DATEONLY
  },
  max_players: {
    type: Sequelize.INTEGER
  }
}, {
    timestamps: false
  });

module.exports = Season