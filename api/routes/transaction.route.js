const express = require('express');
const app = express();
const transactionRoute = express.Router();
const auth = require('../auth');
const paypal = require('../../config/paypal');
const axios = require('axios');

let Transaction = require('../models/transaction');
let Transaction_Item = require('../models/transaction_item');
let Item = require('../models/item');

Transaction.hasMany(Transaction_Item, {foreignKey: 'transaction_id'});
Transaction_Item.belongsTo(Transaction, {foreignKey: 'transaction_id'});

Transaction_Item.belongsTo(Item, {foreignKey: 'item_id'});
Item.hasOne(Transaction_Item, {foreignKey: 'item_id'});

transactionRoute.route('/member').get(auth.member, function (req, res) {
    Transaction.findAll({where: {'member_id': req.member_id, 'transaction_paid': 0}, include: [{model: Transaction_Item, include: [Item]}]}).then(transactionsData =>{
        res.json(transactionsData);
    });
});

transactionRoute.route('/get-one/:id').get(auth.member, function (req, res) {
    Transaction.findOne({where: {'member_id': req.member_id, 'transaction_id': req.params.id}, include: [{model: Transaction_Item, include: [Item]}]}).then(transactionsData =>{
        res.json(transactionsData);
    });
});

transactionRoute.route('/member').post(auth.member, function (req, res) {
    let access_token;
    let paypalDetails

    getPaypalOauth().then(data => {
        access_token = data.data.access_token;
        getPaypalTransactionDetails(req.body.paypalId, access_token).then((paypalDetailsData) => {
            paypalDetails = paypalDetailsData.data;
            Transaction.findOne({where: {
                'member_id': req.member_id,
                'transaction_id': paypalDetails.transactions[0].custom,
                'transaction_total_amount': paypalDetails.transactions[0].amount.total,
                'transaction_paid': 0
            }}).then(transaction => {
                if(transaction) {
                    transaction.updateAttributes({
                        'paypal_transaction_id': paypalDetails.id,
                        'transaction_paid': 1,
                        'paid_date': new Date()
                    }).then(data => {
                        res.json({success: true, confirmation: data.transaction_id})
                    })
                } else {
                    res.json({ERROR: 'Transaction could not be confirmed!'})
                }
            })
        })
    })
});

function getPaypalOauth() {
    let client = paypal.client;
    let secret = paypal.secret;
    let request = axios.create();

    request.defaults.headers.common['Authorization'] = `Basic ${new Buffer(client+':'+secret).toString('base64')}`;
    request.defaults.headers.common['Content-Type'] = 'application/json';
    return request.post('https://api.sandbox.paypal.com/v1/oauth2/token', 'grant_type=client_credentials');
}

function getPaypalTransactionDetails(id, access_token) {
    let request = axios.create()

    request.defaults.headers.common['Authorization'] = "Bearer " + access_token;
    request.defaults.headers.common['Content-Type'] = 'application/json';
    return request.get(`https://api.sandbox.paypal.com/v1/payments/payment/${id}`);
}

module.exports = transactionRoute;