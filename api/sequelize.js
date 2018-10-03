const config = require('../config/DB').mysql;
    
const Sequelize = require('sequelize');

const sequelize = new Sequelize(config.database, config.user, config.password, config.options);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connected to MySQL');
  })
  .catch(err => {
    console.error('Unable to connect to MySQL:', err);
  });

module.exports = sequelize;