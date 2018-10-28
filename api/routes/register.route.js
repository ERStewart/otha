const express = require('express');
const app = express();
const registerRoutes = express.Router();

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// Require member model in our routes module
let Member = require('../models/member');
let Member_Acount = require('../models/member_account');
let Item = require('../models/item');
let Transaction = require('../models/transaction');
let Transaction_Item = require('../models/transaction_item');
let League_Item = require('../models/league_item');
let Player = require('../models/player');

// Defined store route
registerRoutes.route('/').post(function (req, res) {
    let cart = req.body.cart;
    let memberId;
    let leagues = [];
    let memberReq = Object.assign({}, req.body.member);
    delete memberReq.member_password;

    let uniqueItems = cart.filter(function (item, index) {
        return cart.indexOf(item) >= index;
    });

    getItems = Item.findAll({
        where: {
            item_id: { [Op.in]: uniqueItems }
        }
    })

    getLeagueItems = League_Item.findAll();

    memberCreate = Member.create(memberReq);

    Promise.all([getItems, getLeagueItems, memberCreate]).then(([itemsDB, leagueItemsDB, member]) => {
        memberId = member.member_id

        let member_account = {
            member_user_name: req.body.member['member_pri_email'],
            member_password: req.body.member['member_password'],
            member_id: memberId
        };
        let accountCreate = Member_Acount.create(member_account);

        let items = itemsDB.map(item => {
            return item.dataValues
        })
        let leagueItems = leagueItemsDB.map(item => {
            return item.dataValues
        })

        let transItems = cart.map(itemId => {
            item = items.find(item => {
                return item.item_id == itemId
            })
            return {
                item_id: itemId,
                item_price: item.item_price
            }
        })

        let total = 0;
        transItems.forEach(item => {
            total += item.item_price

            let index = leagueItems.findIndex(leagueItem => {
                return leagueItem.item_id == item.item_id
            })
            if (index > -1) {
                leagues.push(leagueItems[index].league_id)
            }
        });

        let transactionCreate = Transaction.create({
            member_id: memberId,
            transaction_total_amount: total
        })


        Promise.all([accountCreate, transactionCreate]).then(([member_account, transaction]) => {
            let playerCreates = [];
            leagues.forEach(leagueId => {
                playerCreates.push(Player.create({
                    member_id: memberId,
                    league_id: leagueId,
                    jersey_deposit: 1
                }))
            })

            let transactionItems = [];
            transItems.forEach(item => {
                transactionItems.push({
                    transaction_id: transaction.transaction_id,
                    item_id: item.item_id,
                    item_price: item.item_price
                })
            })
            let transItemsInsert = Transaction_Item.bulkCreate(transactionItems);

            Promise.all([transItemsInsert, ...playerCreates]).then(data => {
                res.json({ success: true })
            })
        });
    });
});

module.exports = registerRoutes;