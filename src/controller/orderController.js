const Order = require('../model/orderModel');

exports.getOrders = async (req, res, next) => {
  try {
    const result = await Order.getAllWithDetails();
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
};

exports.placeOrder = async (req, res, next) => {
  try {
    const { product_id, customer_name } = req.body;
    if (!product_id || !customer_name) {
      return res.status(400).json({ error: "Barista needs a product ID and name!" });
    }
    await Order.create(product_id, customer_name);
    res.status(201).json({ message: "Order placed! Start steaming the milk." });
  } catch (error) {
    next(error);
  }
};