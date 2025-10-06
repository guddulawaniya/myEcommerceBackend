const Joi = require("joi");
const mongoose = require("mongoose");

const objectId = () =>
  Joi.string().custom((value, helpers) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
      return helpers.message("Invalid ObjectId");
    }
    return value;
  }, "ObjectId Validation");

exports.productValidationSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  description: Joi.string().allow("", null),
  price: Joi.number().positive().required(),
  category: objectId().required(),
  stock: Joi.number().integer().min(0).default(0),
});


exports.updateProductSchema = Joi.object({
    name: Joi.string().min(3).max(100),
    description: Joi.string().min(10).max(500),
    price: Joi.number().min(0),
    stock: Joi.number().integer().min(0),
    category: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
    images: Joi.array().items(Joi.string().uri()),
  });