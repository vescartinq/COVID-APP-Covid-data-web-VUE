const express = require('express');
require('dotenv').config();
const path = require('path');
const history = require('connect-history-api-fallback');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

// Init server
const app = express();

// Connect to DB
const uri = 'xxx';
const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
};
mongoose.connect(uri, options).then(
  () => {
    console.log('Connected to mongoDB');
  },
  (err) => {
    err;
  }
);

// Read body format
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Custom server info
app.use(morgan('tiny'));
// Enable CORS
app.use(cors());

// Routes
app.use('/api', require('./routes/noteRoute'));

// Middleware for Vue.js router History mode
app.use(history());
// Access to app directory
app.use(express.static(path.join(__dirname, 'public')));

// Server info
app.listen(process.env.PORT, () => {
  console.log(`Listening server on port ${process.env.PORT}`);
});
