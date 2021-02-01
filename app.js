const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
// const redis = require('redis');
const clipboardy = require('clipboardy');

const app = express();
const history = [];

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
  history.push('<hr>');
  history.push(clipboard);
  res.send(`<!DOCTYPE html><html><body>
  <script>
  window.onblur= function() {window.onfocus= function () {location.reload(true)}};
  </script>
  <h1>Clipboard</h1>
  <h3>ToDo: - Add Date / Time for ewach clipboard log</h3>
  <!-- <div style="white-space: pre">${clipboard}</div> -->
  <hr>
  <div style="white-space: pre">${history.reverse()}</div>
  </body></html>`);
});

// start server //
app.listen(8867);
console.log('Server Started on port 8867...');

module.exports = app;