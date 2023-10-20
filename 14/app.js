const express = require('express');
const app = express();
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static assets from the public directory
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.get('/', (req, res) => {
  res.render('index.ejs'); // Use '.ejs' extension
});

app.get('/sharks', (req, res) => {
  res.render('sharks.ejs'); // Use '.ejs' extension
});

app.listen(3000, () => {
  console.log('Server is running on  http://localhost:3000');
});
