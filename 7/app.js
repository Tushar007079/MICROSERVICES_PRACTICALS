const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path=require('path');

const app = express();
const port = 3000;

// Create a MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'jamesbond',
    password: '7777',
    database: 'clothing_store',
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database');
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));


// CRUD operations

// 7.1: Add new customer
app.post('/addCustomer', (req, res) => {
    const { name, phone_no, order_id } = req.body;
    const sql = 'INSERT INTO customers (name, phone_no, order_id) VALUES (?, ?, ?)';
    db.query(sql, [name, phone_no, order_id], (err, result) => {
        if (err) throw err;
        console.log('Customer added:', result);
        res.send('Customer added successfully');
    });
});

// 7.2: Add bulk of customers
app.post('/addBulkCustomers', (req, res) => {
    const customers = req.body;
    const sql = 'INSERT INTO customers (name, phone_no, order_id) VALUES ?';
    const values = customers.map((customer) => [customer.name, customer.phone_no, customer.order_id]);
    db.query(sql, [values], (err, result) => {
        if (err) throw err;
        console.log('Bulk customers added:', result);
        res.send('Bulk customers added successfully');
    });
});

// 7.3: Display customers with order_id=111
app.get('/customersWithOrderId/:order_id', (req, res) => {
    const { order_id } = req.params;
    const sql = 'SELECT * FROM customers WHERE order_id = ?';
    db.query(sql, [order_id], (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

// 7.4: Select records where the address starts with 'S'
app.get('/customersWithS', (req, res) => {
    const sql = 'SELECT * FROM customers WHERE name LIKE "S%"';
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

// 7.5: Sort customer list alphabetically by name
app.get('/sortedCustomers', (req, res) => {
    const sql = 'SELECT * FROM customers ORDER BY name';
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

// 7.6: Delete record with phone_no "12345"
app.delete('/deleteCustomer/:phone_no', (req, res) => {
    const { phone_no } = req.params;
    const sql = 'DELETE FROM customers WHERE phone_no = ?';
    db.query(sql, [phone_no], (err, result) => {
        if (err) throw err;
        console.log('Customer deleted:', result);
        res.send('Customer deleted successfully');
    });
});

// Add this route to fetch all customers
app.get('/getAllCustomers', (req, res) => {
    const sql = 'SELECT * FROM customers';
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

// 7.7: Create an API to post customer records (already done in 7.1)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  console.log(`Server is running on http://localhost:${port}`);

});
