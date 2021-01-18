const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const redis = require('redis');
const clipboardy = require('clipboardy');

const app = express();

// ejs view engine setup //
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middleware //
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// routes //
app.get('/', function (req, res) {
  let clipboard = clipboardy.readSync();
  console.log(clipboard);
  res.send(clipboard);
});

// start server //
app.listen(8867);
console.log('Server Started on port 8867...');

module.exports = app;