const { publicDecrypt } = require('crypto');
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello, Dockerized Node.js App!');
});

// Serve static files from the "public" directory
app.use(express.static('public'));

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`);
});
