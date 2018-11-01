const express = require('express');
const app = express();
const transactionRoute = express.Router();
const auth = require('../auth')

// Require member model in our routes module
let Transaction = require('../models/transaction');
let Transaction_Item = require('../models/transaction_item');
let Item = require('../models/item');

Transaction.hasMany(Transaction_Item, {foreignKey: 'transaction_id'});
Transaction_Item.belongsTo(Transaction, {foreignKey: 'transaction_id'});

Transaction_Item.belongsTo(Item, {foreignKey: 'item_id'});
Item.hasOne(Transaction_Item, {foreignKey: 'item_id'});

// Defined store route
transactionRoute.route('/member').get(auth.member, function (req, res) {
    Transaction.findAll({where: {'member_id': req.member_id, 'transaction_paid': 0}, include: [{model: Transaction_Item, include: [Item]}]}).then(transactionsData =>{
        res.json(transactionsData);
    });
});

module.exports = transactionRoute;