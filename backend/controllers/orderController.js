import Order from "../models/Order.js"
import Product from "../models/Product.js";



export const getOrders = async (req, res) => {
  try {
    if (req.role === 'Admin') {
      const orders = await Order.find();
      return res.status(200).json(orders);
    } else {
      const orders = await Order.find({ user: req.userId });
      return res.status(200).json(orders);
    }
  } catch (err) {
    return res.status(400).json({ message: err.message });

  }
}

export const getOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findById(id);
    return res.status(200).json(order);
  } catch (err) {
    return res.status(400).json({ message: err.message });

  }
}

export const createOrder = async (req, res) => {
  const { products, totalAmount } = req.body;
  try {
    for (let item of products) {
      const qty = Number(item.qty);
      if (isNaN(qty) || qty <= 0) {
        return res.status(400).json({ message: `Invalid quality for ${item.title}` })
      }
      const updated = await Product.updateOne(
        { _id: item.id, stock: { $gte: qty } }, //only update if there is enough stock
        { $inc: { stock: -qty } }
      );

      if (updated.modifiedCount === 0) {
        return res.status(400).json({ message: `Not enough stock for ${item.title}` });
      }
    }

    await Order.create({
      user: req.userId,
      products,
      totalAmount
    });

    return res.status(200).json({ message: 'Order created successfully' })
  } catch (err) {
    return res.status(400).json({ message: err.message });

  }
}