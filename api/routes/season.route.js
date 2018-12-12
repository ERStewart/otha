const express = require('express');
const moment = require('moment');
const app = express();
const seasonRoutes = express.Router();
const { Op } = require('sequelize')

// Require member model in our routes module
let League = require('../models/league');
let Season = require('../models/season');
let Season_Item = require('../models/season_item');
let Item = require('../models/item');

Item.hasMany(Season_Item, {foreignKey: 'item_id'});
Season_Item.belongsTo(Item, {foreignKey: 'item_id'})

Season.hasOne(League, {foreignKey: 'league_id'});

// Defined store route
seasonRoutes.route('/open').get(function (req, res) {
    let criteria = {
        'registration_open_date': {[Op.lte]: moment().toDate()},
        'registration_close_date': {[Op.gte]: moment().toDate()}
    }
    Season.findAll({where: criteria, include: [League]}).then(seasons =>{
        let seasonItemsPromises = [];
        seasons.forEach(season => {
            seasonItemsPromises.push(Season_Item.findAll({where: {'season_id': season.season_id}, include: [Item]}));
        })

        Promise.all(seasonItemsPromises).then(seasonItemsArray => {
            seasons.forEach(season => {
                season.dataValues['items'] = seasonItemsArray.find(itemsArray => {
                    return season.season_id === itemsArray[0].season_id;
                })
            })
            res.json(seasons);
        })
    });
});

module.exports = seasonRoutes;