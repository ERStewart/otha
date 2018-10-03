const Sequelize = require('sequelize');
const sequelize = require('../sequelize');

const Member_Account = sequelize.define('member_account', {
    member_account_id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    member_id: {
      type: Sequelize.INTEGER
    },
    member_role_id: {
      type: Sequelize.INTEGER
    },
    member_active: {
      type: Sequelize.TINYINT
    },
    member_locked: {
      type: Sequelize.TINYINT
    },
    member_user_name: {
      type: Sequelize.STRING
    },
    member_password: {
      type: Sequelize.STRING
    },
    member_last_login: {
      type: Sequelize.DATE
    }
  }, {
      timestamps: false
  });
  
  module.exports = Member_Account