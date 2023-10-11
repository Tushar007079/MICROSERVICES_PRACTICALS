const https = require('https');
const fs = require('fs');
const express = require('express');

const app = express();
const port = 443;

const options = {
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.crt')
};

const server = https.createServer(options, app);

app.get('/', (req, res) => {
  res.send('Welcome to the Secure Website!'); 
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});