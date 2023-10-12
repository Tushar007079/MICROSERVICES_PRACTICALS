const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./db');

app.use(bodyParser.json());

app.get('/orders', async (req, res) => {
  const orders = await db.Order.find();
  res.json(orders);
});

app.post('/orders', async (req, res) => {
  const newOrder = new db.Order(req.body);
  await newOrder.save();
  res.status(201).json(newOrder);
});

// Update an order by ID
app.put('/orders/:customerId', async (req, res) => {
    const { customerId } = req.params;
    const updatedOrder = await db.Order.findOneAndUpdate({ customerId }, req.body, { new: true });
    res.json(updatedOrder);
  });
  
  // Delete an order by ID
  app.delete('/orders/:customerId', async (req, res) => {
    const { customerId } = req.params;
    const deletedOrder = await db.Order.findOneAndRemove({ customerId });
    res.json(deletedOrder);
  });
  
const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Order service is running on port ${PORT}`);
});
