import mongoose from "mongoose";

export const brands = [
  "Apple",
  "Samsung",
  "Sony",
  "Xiaomi",
  "Dell",
  "HP",
  "Nike",
  "Adidas",
  "Puma",
  "Levi's",
];

export const categories = [
  "Mobile",
  "Laptop",
  "Tablet",
  "Accessory",
  "Shoes",
  "Clothing",
  "Electronics",
  "Home Appliances",
];

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
      minLength: [5, "Title must be at least 5 characters long"],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      enum: brands,
      required: true,
    },
    category: {
      type: String,
      enum: categories,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        rating: {
          type: Number,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
