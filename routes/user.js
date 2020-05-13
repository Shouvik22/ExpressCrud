const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const {User, validate} = require('../models/user');
const express = require('express');
const router = express.Router();



router.post('/',async(req,res) => {

    
    const { error } = validate(req.body);
    if (error) return res.status(400).send({ status:400, message:error.details[0].message, result:null });


    let user = await User.findOne({ email: req.body.email });
    if(user) return res.status(400).send({ status:400, message:'User already registered!', result:null });

    user = new User(_.pick(req.body,['name','email','password']));

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();


    const token = jwt.sign({ _id:user._id }, 'PrivateKey');
    
    res.header('x-auth-token',token).send({status:200,message:'Success',result:_.pick(user, ['_id','name','email'])});
});



router.post('/login', async(req,res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send({ status:400, message:error.details[0], result:null });

    let user = await User.findOne({ email: req.body.email });
    if(!user) return res.status(400).send({ status:400, message:'Email or password is invalid!', result:null });
    const validPassword = await bcrypt.compare(req.body.password,user.password);
    if(!validPassword) return res.status(400).send('Email or password is invalid!');

    const token = user.generateAuthToken();
    res.header('x-auth-token',token).send({status:200,message:'Success',result:_.pick(user, ['_id','name','email'])});
});

module.exports = router;