const express = require('express');
const app = express();
const itemRoutes = express.Router();

// Require member model in our routes module
let Item = require('../models/item');

// Defined store route
itemRoutes.route('/').get(function (req, res) {
    Item.findAll().then(items =>{
        res.json(items);
    });
});

module.exports = itemRoutes;