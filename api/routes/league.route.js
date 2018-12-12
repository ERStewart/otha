const express = require('express');
const app = express();
const leaguesRoutes = express.Router();

// Require member model in our routes module
let League = require('../models/league');
let Season_Item = require('../models/season_item');
let Item = require('../models/item');

Item.hasMany(Season_Item, {foreignKey: 'item_id'});
Season_Item.belongsTo(Item, {foreignKey: 'item_id'})

// Defined store route
leaguesRoutes.route('/').get(function (req, res) {
    League.findAll().then(leagues =>{
        let leagueItemsPromises = [];
        leagues.forEach(league => {
            leagueItemsPromises.push(Season_Item.findAll({where: {'league_id': league.league_id}, include: [Item]}));
        })

        Promise.all(leagueItemsPromises).then(leagueItemsArrays => {
            leagues.forEach(league => {
                league.dataValues['items'] = leagueItemsArrays.find(itemsArray => {
                    return league.league_id === itemsArray[0].league_id;
                })
            })
            res.json(leagues);
        })
    });
});

module.exports = leaguesRoutes;