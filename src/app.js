const { initializePile , hostGame} = require('./handlers/handleRequests.js');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const logRequest = function(req, res, next) {
  console.log(req.url);
  console.log(req.method);
  console.log(req.body);
  next();
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logRequest);
app.post('/hostGame', hostGame);
app.use(express.static('public'));

app.get('/pile', initializePile);
app.use(express.static('public'));

module.exports = { app };
