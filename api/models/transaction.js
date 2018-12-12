const Sequelize = require('sequelize');
const sequelize = require('../sequelize');

const Transaction = sequelize.define('transaction', {
  transaction_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  member_id: {
    type: Sequelize.INTEGER
  },
  transaction_total_amount: {
    type: Sequelize.FLOAT
  },
  transaction_discount: {
    type: Sequelize.FLOAT
  },
  transaction_paid: {
    type: Sequelize.TINYINT
  },
  created_date: {
    type: Sequelize.DATE,
    defaultValue: new Date()
  },
  paid_date: {
    type: Sequelize.DATE
  },
  transaction_due: {
    type: Sequelize.DATE,
    defaultValue: new Date()
  },
  paypal_transaction_id: {
    type: Sequelize.STRING
  }
}, {
    timestamps: false
  });

module.exports = Transaction