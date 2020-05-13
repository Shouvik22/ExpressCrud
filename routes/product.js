const auth = require('../middleware/auth');
const {Product, validate} = require('../models/product');
const express = require('express');
const router = express.Router();



router.post('/',auth,async(req,res) => {  
    
    const { error } = validate(req.body); 
    if (error) return res.status(400).send({ status:400, message:error.details[0].message, result:null });

    let product = new Product({ name: req.body.name, price: req.body.price });
    product = await product.save();
    
    res.status(200).send({ status:200,message:'Success',result:product });
});

router.get('/',auth, async(req,res) => {
    const product = await Product.find();
    res.status(200).send({ status:200,message:'Success', result:product });
});




router.get('/:id',auth, async(req,res) => {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).send({ status:400, message:'The product with the given ID was not found.', result:null });
    res.status(200).send({ status:200,message:'Success', result:product });
});


router.put('/:id',auth, async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send({ status:400, message:error.details[0].message, result:null });
  
    const product = await Product.findByIdAndUpdate(req.params.id, { name: req.body.name, price:req.body.price }, {
      new: true
    });
  
    if (!product) return res.status(404).send({ status:400, message:'The product with the given ID was not found.', result:null });
    
    res.status(200).send({ status:200,message:'Success', result:product });
});

router.delete('/:id',auth, async (req, res) => {
    const product = await Product.findByIdAndRemove(req.params.id);
  
    if (!product) return res.status(404).send({ status:400, message:'The product with the given ID was not found.', result:null });
  
    res.status(200).send({ status:200,message:'Success', result:product });
});

module.exports = router;