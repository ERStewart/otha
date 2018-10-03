let express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    sequelize = require('./sequelize');

const app = express();
app.use(bodyParser.json());
app.use(cors());

var port = process.env.PORT || 4100;

const memberRoutes = require('./routes/member.route');
app.use('/members', memberRoutes);

const sessionRoutes = require('./routes/session.route');
app.use('/session', sessionRoutes);

var server = app.listen(port, function(){
    console.log('Listening on port ' + port);
});