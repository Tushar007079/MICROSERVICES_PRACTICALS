const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const http = require('http');

const app = express();
const PORT = 3000;
const cors = require('cors');
app.use(cors());

app.use(bodyParser.json());
app.use(express.static('public'));

// File to store user data
const usersFile = './users.json';

// Read existing user data from JSON file
const getUsers = () => {
  try {
    const data = fs.readFileSync(usersFile);
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

// Write user data to JSON file
const saveUsers = (users) => {
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
};

// Add a variable to track the latest update
let latestUpdate = {
  type: '',
  username: '',
};

// Endpoint to add a new user
app.post('/user/add', (req, res) => {
  const users = getUsers();
  const newUser = req.body;
  const existingUser = users.find((user) => user.name === newUser.name);

  if (existingUser) {
    return res.status(400).json({ error: 'User already exists' });
  }

  users.push(newUser);
  saveUsers(users);

  latestUpdate = {
    type: 'add',
    username: newUser.name,
  };

  res.status(201).json(newUser);
});

// Endpoint to list all users
app.get('/user/list', (req, res) => {
  const users = getUsers();
  res.status(200).json({ users, latestUpdate });
});

// Endpoint to update a user by username
app.patch('/user/update/:username', (req, res) => {
  const username = req.params.username;
  const users = getUsers();
  const updatedUser = req.body;
  const index = users.findIndex((user) => user.name === username);

  if (index === -1) {
    return res.status(404).json({ error: 'User not found' });
  }

  users[index] = { ...users[index], ...updatedUser };
  saveUsers(users);

  latestUpdate = {
    type: 'update',
    username: updatedUser.name,
  };

  res.status(200).json(users[index]);
});

// Endpoint to delete a user by username
app.delete('/user/delete/:username', (req, res) => {
  const username = req.params.username;
  const users = getUsers();
  const index = users.findIndex((user) => user.name === username);

  if (index === -1) {
    return res.status(404).json({ error: 'User not found' });
  }

  users.splice(index, 1);
  saveUsers(users);

  latestUpdate = {
    type: 'delete',
    username,
  };

  res.status(204).send();
});


// Endpoint to list all users
app.get('/user/list', (req, res) => {
    console.log('Received a request to /user/list');
    const users = getUsers();
    res.status(200).json({ users });
});


// Create an HTTP server
const server = http.createServer(app);

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

server.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
