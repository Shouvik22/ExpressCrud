const winston = require('winston');
const mongoose = require('mongoose');

module.exports = function(){
    mongoose.connect('mongodb://localhost/crud_final')
  .then(() => winston.info('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));
}