const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

const secretKey = process.env.SECRET_KEY || 'default-secret'; // 'default-secret' is a fallback in case the environment variable is not set


// Mock user for demonstration
const mockUser = {
  id: Date.now(),
  userEmail: 'tusharpanchal21@gnu.ac.in',
  password: '007',
};

// Route for user login and token generation
app.post('/api/login', (req, res) => {

  // Generate a JWT token
  jwt.sign({ user: mockUser }, secretKey, { expiresIn: '120s' }, (err, token) => {
    if (err) {
      res.status(500).json({ error: 'Failed to create token' });
    } else {
      res.json({ token });
    }
  });
});

// Protected route that requires a valid JWT token
app.get('/api/profile', verifyToken, (req, res) => {
  // The verifyToken middleware verifies the JWT token
  jwt.verify(req.token, secretKey, (err, authData) => {
    if (err) {
      res.sendStatus(403); // Forbidden if token is invalid or expired
    } else {
      res.json({
        message: 'Welcome to Profile',
        userData: authData.user,
      });
    }
  });
});

// Middleware to extract and verify the JWT token from the Authorization header
function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];

  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];

    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403); // Forbidden if no token is provided in the header
  }
}

const port = 5000;
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});