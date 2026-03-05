const db = require('../config/db');

const Order = {
  // Get all orders with the coffee name joined from products table
  getAllWithDetails: async () => {
    const sql = `
      SELECT orders.id, orders.customer_name, products.name AS coffee_name, 
             products.price_per_cup, orders.status, orders.created_at
      FROM orders
      JOIN products ON orders.product_id = products.id
      ORDER BY orders.created_at DESC
    `;
    return await db.execute(sql);
  },

  create: async (productId, customerName) => {
    return await db.execute({
      sql: "INSERT INTO orders (product_id, customer_name) VALUES (?, ?)",
      args: [productId, customerName]
    });
  }
};

module.exports = Order;