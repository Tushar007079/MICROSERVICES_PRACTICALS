const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./db');

app.use(bodyParser.json());

app.get('/books', async (req, res) => {
    const books = await db.Book.find();
    res.json(books);
});

app.post('/books', async (req, res) => {
    const newBook = new db.Book(req.body);
    await newBook.save();
    res.status(201).json(newBook);
});

// Update a book by isbn(International Standard Book Number)
app.put('/books/:isbn', async (req, res) => {
    const { isbn } = req.params;
    const updatedBook = await db.Book.findOneAndUpdate({ isbn }, req.body, { new: true });
    res.json(updatedBook);
  });
  

// Delete a book by isbn(International Standard Book Number)
app.delete('/books/:isbn', async (req, res) => {
    const { isbn } = req.params;
    const deletedBook = await db.Book.findOneAndRemove({ isbn });
    res.json(deletedBook);
  });
  

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Book service is running on port ${PORT}`);
});