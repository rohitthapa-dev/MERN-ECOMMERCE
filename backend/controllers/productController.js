

import mongoose from "mongoose"
import Product, { brands, categories } from "../models/Product.js"
import fs from 'fs'
import { json } from "express";
import { removeFile } from "../utils/removeFile.js";

export const getTop5Products = (req, res, next) => {
  req.mongoQuery = { rating: { $gt: 4 } };

  req.limit = '5',   // top 5
    req.sort = '-rating' // descending rating
  next();
}


export const getProducts = async (req, res) => {
  // console.log(req.cookie.jwt);
  try {

    const queryObject = { ...req.mongoQuery };

    const excludeFields = ['sort', 'fields', 'search', 'page', 'limit', 'skip'];

    excludeFields.forEach((field) => {
      delete queryObject[field]
    })

    // Search handling
    if (req.query.search) {
      const searchText = req.query.search;

      if (categories.some((name) => name.toLowerCase() === searchText.toLowerCase())) {
        queryObject.category = { $regex: searchText, $options: 'i' };
      } else if (brands.some((name) => name.toLowerCase() === searchText.toLowerCase())) {
        queryObject.brand = { $regex: searchText, $options: 'i' };
      } else {
        queryObject.title = { $regex: searchText, $options: 'i' };
      }


    }

    const query = Product.find(queryObject);

    // Sorting
    const sortBy = req.query.sort || req.sort;
    if (sortBy) {
      const sorting = sortBy.split(/[\s,]+/).filter(Boolean).join(' ');
      query.sort(sorting);
    }

    // Field selection
    if (req.query.fields) {
      const fields = req.query.fields.split(/[\s,]+/).filter(Boolean).join(' ');
      query.select(fields);
    }

    // Pagination
    const limit = parseInt(req.query.limit, 10) || req.limit || 10;
    const page = parseInt(req.query.page, 10) || 1;
    const skip = (page - 1) * limit;

    const data = await query.skip(skip).limit(limit);
    const total = req.limit && !req.query.page ? data.length : await Product.countDocuments(query.getFilter());
    const totalPage = req.limit && !req.query.page ? 1 : Math.ceil(total / limit);
    return res.status(200).json({
      data,
      total,
      page,
      totalPage
    })
  } catch (err) {
    return res.status(400).json({ message: err.message })
  }

}


export const getProduct = async (req, res) => {

  const { id } = req.params;
  try {
    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ message: 'Invalid Id' })
    const data = await Product.findById(id).populate({
      path: 'reviews.user',
      select: 'username email'
    });
    if (!data) { return res.status(404).json({ message: 'Data not found' }) }
    return res.status(200).json({ data: data })
  } catch (err) {
    return res.status(400).json({ message: err.message })
  }

}

export const createProduct = async (req, res) => {

  try {
    await Product.create({
      ...req.body,
      image: req.imagePath
    });
    return res.status(200).json({ message: 'Data added sucessfully' })

  } catch (err) {
    fs.unlink(`./uploads/${req.imagePath}`, (error) => {
      return res.status(400).json({ message: err.message });
    })

  }

}

export const updateProduct = async (req, res) => {

  const { id } = req.params;
  try {
    if (!mongoose.isValidObjectId(id)) {
      if (req.imagePath) removeFile(req.imagePath)
      return res.status(400).json({ message: 'Invalid Id' });
    }
    const isExist = await Product.findById(id);
    if (!isExist) {
      if (req.imagePath) removeFile(req.imagePath)
      return res.status(404).json({ message: 'Data not found' })
    }

    const oldImage = isExist.image;

    isExist.title = req.body?.title || isExist.title;
    isExist.description = req.body?.description || isExist.description;
    isExist.stock = req.body?.stock || isExist.stock;
    isExist.brand = req.body?.brand || isExist.brand;
    isExist.price = req.body?.price || isExist.price;
    isExist.category = req.body?.category || isExist.category;
    // isExist.image = req.imagePath || isExist.image;
    if (req.imagePath) {
      isExist.image = req.imagePath;
    }
    await isExist.save();

    if (req.imagePath && oldImage) {
      removeFile(oldImage);
    }

    return res.status(200).json({ message: 'Data Update sucessfully' })
  } catch (err) {
    if (req.imagePath) removeFile(req.imagePath)
    return res.status(400).json({ message: err.message });
  }

}

export const removeProduct = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ message: 'Invalid Id' });
    const isExist = await Product.findById(id);
    if (!isExist) { return res.status(404).json({ message: 'Data not found' }) }
    fs.unlink(`./uploads/${isExist.image}`, async (error) => {
      await isExist.deleteOne();
      return res.status(200).json({ message: 'Data Deleted sucessfully' })
    });

  } catch (err) {
    return res.status(400).json({ message: err.message })
  }

}

export const productReview = async (req, res) => {
  const { id } = req.params;
  const { rating, comment } = req.body;
  try {
    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ message: 'Invalid Id' });
    const isExist = await Product.findById(id);
    if (!isExist) res.status(404).json({ message: 'Product not found' });
    isExist.reviews.push({
      user: req.userId,
      rating,
      comment
    });
    const avgRating = isExist.reviews.reduce((acc, item) => acc + item.rating, 0) / isExist.reviews.length;
    isExist.rating = avgRating;
    await isExist.save();
    return res.status(201).json({ message: 'Review added successfully' });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
}


// const products = [
//   { id: 1, title: 'Shoes', price: 900 },
//   { id: 2, title: 'Machine', price: 1900 },
//   { id: 3, title: 'Pc', price: 9000 },
// ];



// export const getProducts = (req, res) => {
//   return res.status(200).json({ data: products });
// }

// export const createProduct = (req, res) => {
//   products.push(req.body);
//   return res.status(200).json({ data: products });
// }

// export const getProductById = (req, res) => {
//   const id = Number(req.params.id)
//   const product = products.find((a) => {
//     return a.id === id
//   });

//   if (product) { return res.status(200).json({ data: product }); }
//   return res.status(404).json({ message: 'Product not found' });

// }