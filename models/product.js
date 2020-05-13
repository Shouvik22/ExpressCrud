const Joi = require('joi');
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  price:{ type:String ,required: true }
});

const Product = mongoose.model('Product', productSchema);

function validateProduct(product) {
  const schema = {
    name: Joi.string().min(3).required(),
    price: Joi.string().required()
  };

  return Joi.validate(product, schema);
}

exports.productSchema = productSchema;
exports.Product = Product; 
exports.validate = validateProduct;