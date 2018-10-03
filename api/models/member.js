const Sequelize = require('sequelize');
const sequelize = require('../sequelize');

const Member = sequelize.define('member', {
    member_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    member_fname: {
      type: Sequelize.STRING
    },
    member_lname: {
      type: Sequelize.STRING
    },
    member_reg_date: {
      type: Sequelize.DATEONLY,
      defaultValue: new Date()
    },
    member_pri_email: {
      type: Sequelize.STRING
    }
  }, {
      timestamps: false
  });
  
  module.exports = Member