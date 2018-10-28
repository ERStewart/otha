const Sequelize = require('sequelize');
const sequelize = require('../sequelize');

const League = sequelize.define('league', {
  league_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  league_name: {
    type: Sequelize.STRING
  },
  league_desc: {
    type: Sequelize.STRING
  },
  league_level: {
    type: Sequelize.STRING
  }
}, {
    timestamps: false
  });

module.exports = League