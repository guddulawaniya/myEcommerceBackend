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
  slug: Joi.string().min(3).max(100).required(),
  description: Joi.string().allow("", null),
  price: Joi.number().positive().required(),
  category: objectId().required(),
  stock: Joi.number().integer().min(0).default(0),
  brand: Joi.string().max(100).optional(),

  discountPrice: Joi.number().optional(),
  onSale: Joi.boolean().optional(),

  images: Joi.array().items(
    Joi.object({
      url: Joi.string().uri().required(),
      key: Joi.string().required()
    })
  ).optional(),

  variants: Joi.array().items(
    Joi.object({
      size: Joi.string().required(),
      color: Joi.string().required(),
      //price: Joi.number().required(),
      stock: Joi.number().integer().min(0).optional(),
      sku: Joi.string().optional(),
      isDefault: Joi.boolean().optional(),
      // removed color and images as per your current schema
    })
  ).optional(),

  defaultVariant: Joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).optional()
});


exports.updateProductSchema = Joi.object({
  name: Joi.string().min(3).max(100).optional(),
  slug: Joi.string().min(3).max(100).optional(),
  description: Joi.string().min(10).max(500).optional(),
  price: Joi.number().min(0).optional(),
  stock: Joi.number().integer().min(0).optional(),
  category: objectId().optional(),
  brand: Joi.string().max(100).optional(),

  discountPrice: Joi.number().optional(),
  onSale: Joi.boolean().optional(),

  images: Joi.array().items(
    Joi.object({
      url: Joi.string().uri().required(),
      key: Joi.string().required()
    })
  ).optional(),

  variants: Joi.array().items(
    Joi.object({
      size: Joi.string().optional(),
      color: Joi.string().required(),
      //price: Joi.number().optional(),
      //stock: Joi.number().integer().min(0).optional(),
      sku: Joi.string().optional(),
      isDefault: Joi.boolean().optional(),
      // removed color and images to match your schema
    })
  ).optional(),

  defaultVariant: Joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).optional()
});
