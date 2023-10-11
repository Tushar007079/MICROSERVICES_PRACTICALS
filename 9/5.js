const express = require('express');
const basicAuth = require('basic-auth');

const app = express();
app.use(express.json());

// Dummy user data (replace with your actual user data or database)
const users = [
  { username: 'admin', password: 'password' },
  { username: 'user', password: 'pass123' },
];

// Dummy item data (replace with your actual data or database)
const items = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
];

// Middleware to handle basic authentication
const authenticate = (req, res, next) => {
  const credentials = basicAuth(req);

  if (!credentials) {
    return res.status(401).send('Unauthorized');
  }

  const user = users.find((u) => u.username === credentials.name && u.password === credentials.pass);

  if (!user) {
    return res.status(401).send('Unauthorized');
  }

  // If authentication is successful, store the user information in the request object
  req.user = user;
  next();
};

// Protected API routes
app.get('/api/items', authenticate, (req, res) => {
  // Only authenticated users can access this route
  res.json({ items });
});

app.get('/api/items/:id', authenticate, (req, res) => {
  const itemId = parseInt(req.params.id);
  const item = items.find((i) => i.id === itemId);

  if (!item) {
    return res.status(404).json({ error: 'Item not found' });
  }

  res.json({ item });
});

app.post('/api/items', authenticate, (req, res) => {
  // Only authenticated users can create items
  const newItem = req.body;
  newItem.id = items.length + 1;
  items.push(newItem);

  res.status(201).json({ message: 'Item created', newItem });
});

app.put('/api/items/:id', authenticate, (req, res) => {
  // Only authenticated users can update items
  const itemId = parseInt(req.params.id);
  const itemIndex = items.findIndex((i) => i.id === itemId);

  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Item not found' });
  }

  const updatedItem = req.body;
  updatedItem.id = itemId;
  items[itemIndex] = updatedItem;

  res.json({ message: 'Item updated', updatedItem });
});

app.delete('/api/items/:id', authenticate, (req, res) => {
  // Only authenticated users can delete items
  const itemId = parseInt(req.params.id);
  const itemIndex = items.findIndex((i) => i.id === itemId);

  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Item not found' });
  }

  const deletedItem = items.splice(itemIndex, 1)[0];

  res.json({ message: 'Item deleted', deletedItem });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});