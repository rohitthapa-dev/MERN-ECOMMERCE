
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  // Order can contain many Products (stored in products[]).
  products: [
    {
      title: { type: String, required: true },
      image: { type: String, required: true },
      price: { type: Number, required: true },
      qty: { type: Number, required: true },
    }
  ],

  totalAmount: {
    type: Number,
    required: true
  }

}, { timestamps: true })

const Order = mongoose.model('Order', orderSchema);
export default Order;