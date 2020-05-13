const express = require('express');
const user = require('../routes/user');
const product = require('../routes/product');

module.exports = function(app){
    app.use(express.json());
    app.use('/api/product',product);
    app.use('/api/user',user);
}