require('express-async-errors');
const winston = require('winston');
require('winston-mongodb');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const express = require('express');
const app = express();

require('./startup/db')();
require('./startup/routes')(app);


winston.handleExceptions(
    new winston.transports.Console({ colorize: true, prettyPrint: true }), // to show the enviorment file for private key
    new winston.transports.File({ filename: 'uncaughtException.log' }));
    process.on('unhandledRejection', (ex) =>{
    throw ex;
});
  
  
winston.add(winston.transports.File,{ filename: 'logfile.log' });
winston.add(winston.transports.MongoDB, { db: 'mongodb://localhost/vidly' });




const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));