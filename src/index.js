const express = require('express');
const cors = require('cors');
const logger = require('./middleware/logger');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: [
    'https://barista-front-end.vercel.app/', // Your production frontend
    'http://localhost:5173'            // Keep this for local development
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));

// Handle preflight requests
app.options('*', cors());

app.use(express.json());
app.use(logger);

// Routes
app.use('/api/orders', orderRoutes);

// 3. Health Check
app.get('/', (req, res) => {
  res.send('☕ Welcome to the Barista API! Go to /api/orders to see the menu.');
});

// Basic Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke in the cafe!' });
});

// app.listen(PORT, () => {
//   console.log(`☕ Barista Server steaming on port http://localhost:${PORT}`);
//   console.log(`☕ Barista Server steaming on port http://localhost:${PORT}/api/orders`);
// });

// ONLY run app.listen if we are NOT on Vercel
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`☕ Barista Server steaming on port http://localhost:${PORT}`);
  });
}

// Export the app for Vercel
module.exports = app;