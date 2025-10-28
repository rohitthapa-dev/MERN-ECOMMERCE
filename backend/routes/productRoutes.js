

import express from 'express';
import { createProduct, getProduct, getProducts, getTop5Products, productReview, removeProduct, updateProduct } from '../controllers/productController.js';
import { checkFile, updateFile } from '../middlewares/fileCheck.js';
import { productSchema, productUpdate, validatorJoi } from '../utils/validator.js';
import { queryParser } from '../middlewares/queryParser.js';
import { adminCheck, checkUser } from '../middlewares/checkAuth.js';





const router = express.Router();

//getAllProducts,getTopRatedProducts, searchProduct,productAdd, 
router.route('/products').get(queryParser, getProducts).post(checkUser, adminCheck, validatorJoi.body(productSchema), checkFile, createProduct);

router.route('/products/reviews/:id').post(checkUser, productReview)

router.route('/top-5-products').get(getTop5Products, getProducts)


// //  getProductById, deleteProduct, updateProduct, 
router.route('/products/:id').get(getProduct).patch(checkUser, adminCheck, validatorJoi.body(productUpdate), updateFile, updateProduct).delete(checkUser, adminCheck, removeProduct);

export default router;