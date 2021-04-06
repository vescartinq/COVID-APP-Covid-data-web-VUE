const express = require('express');
require('dotenv').config();
const path = require('path');
const history = require('connect-history-api-fallback');
const morgan = require('morgan');
const cors = require('cors');

// Init server
const app = express();

// Read body format
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Custom server info
app.use(morgan('tiny'));
// Enable CORS
app.use(cors());

// Routes
app.get('/', function (req, res) {
  res.send('Server running well!');
});

// Middleware for Vue.js router History mode
app.use(history());
// Access to app directory
app.use(express.static(path.join(__dirname, 'public')));

// Server info
app.listen(process.env.PORT, () => {
  console.log(`Listening server on port ${process.env.PORT}`);
});
