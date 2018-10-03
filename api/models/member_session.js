const Sequelize = require('sequelize');
const sequelize = require('../sequelize');

const Member_Session = sequelize.define('member_session', {
    session_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    member_id: {
      type: Sequelize.INTEGER
    },
    session_token: {
      type: Sequelize.STRING
    },
    created_at: {
      type: Sequelize.DATE,
      defaultValue: new Date()
    },
    expired_at: {
      type: Sequelize.DATE
    },
    active: {
      type: Sequelize.TINYINT
    }
  }, {
      timestamps: false
  });
  
  module.exports = Member_Session