const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware for parsing request body
app.use(bodyParser.urlencoded({ extended: false }));

// In-memory database for storing user credentials (Replace with a database in a production environment)
const users = [
  { username: 'admin', password: 'admin' },
  { username: 'James Bond', password: '007' },
];

// Middleware for basic authentication
function authentication(req, res, next) {
  const { username, password } = req.body;

  if (!username || !password) {
    const err = new Error('Username and password are required.');
    err.status = 400;
    return next(err);
  }

  const user = users.find((u) => u.username === username && u.password === password);

  if (user) {
    next(); // Authorized user
  } else {
    const err = new Error('Invalid username or password.');
    err.status = 401;
    return next(err);
  }
}

// Serve a login form
app.get('/login', (req, res) => {
  res.send(`
    <form method="post" action="/protected">
      <label for="username">Username:</label>
      <input type="text" name="username" id="username"><br>
      <label for="password">Password:</label>
      <input type="password" name="password" id="password"><br>
      <button type="submit">Login</button>
    </form>
  `);
});

// Apply authentication middleware to protect the protected route
app.post('/protected', authentication, (req, res) => {
  res.send('You have access to this protected route.');
});

// Unprotected route for testing
app.get('/public', (req, res) => {
  res.send('This route is public and doesn\'t require authentication.');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});