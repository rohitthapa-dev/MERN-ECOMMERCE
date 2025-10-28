
import joi from "joi";
import joiValidate from 'express-joi-validation';

export const validatorJoi = joiValidate.createValidator({});

export const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(5).max(40).required()
});

export const registerSchema = joi.object({
  username: joi.string().min(5).required(),
  email: joi.string().email().required(),
  password: joi.string().min(5).max(40).required()
});

export const updateUserSchema = joi.object({
  username: joi.string().min(5),
  email: joi.string().email()
});

export const productSchema = joi.object({
  title: joi.string().required().min(5),
  description: joi.string().required(),
  brand: joi.string().valid("Apple",
    "Samsung",
    "Sony",
    "Xiaomi",
    "Dell",
    "HP",
    "Nike",
    "Adidas",
    "Puma",
    "Levi's").required(),
  category: joi.string().valid("Mobile",
    "Laptop",
    "Tablet",
    "Accessory",
    "Shoes",
    "Clothing",
    "Electronics",
    "Home Appliances").required(),
  stock: joi.number().required(),
  price: joi.number().required(),
})

export const productUpdate = joi.object({
  title: joi.string().min(5),
  description: joi.string(),
  brand: joi.string().valid("Apple",
    "Samsung",
    "Sony",
    "Xiaomi",
    "Dell",
    "HP",
    "Nike",
    "Adidas",
    "Puma",
    "Levi's"),
  category: joi.string().valid("Mobile",
    "Laptop",
    "Tablet",
    "Accessory",
    "Shoes",
    "Clothing",
    "Electronics",
    "Home Appliances"),
  stock: joi.number(),
  price: joi.number(),
})