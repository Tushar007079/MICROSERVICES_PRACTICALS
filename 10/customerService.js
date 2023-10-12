const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./db');

app.use(bodyParser.json());

app.get('/customers', async (req, res) => {
    const customers = await db.Customer.find();
    res.json(customers);
});

app.post('/customers', async (req, res) => {
    const newCustomer = new db.Customer(req.body);
    await newCustomer.save();
    res.status(201).json(newCustomer);
});

// Update a customer by name
app.put('/customers/:name', async (req, res) => {
    const { name } = req.params;
    const updatedCustomer = await db.Customer.findOneAndUpdate({ name }, req.body, { new: true });
    res.json(updatedCustomer);
  });
  
// Delete a customer by name
app.delete('/customers/:name', async (req, res) => {
    const { name } = req.params;
    const deletedCustomer = await db.Customer.findOneAndRemove({ name });
    res.json(deletedCustomer);
  });
  
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Customer service is running on port ${PORT}`);
});