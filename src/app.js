const { initializePile } = require('./handlers/handleRequests.js');
const express = require('express');
const app = express();

app.get('/pile', initializePile);
app.use(express.static('public'));

module.exports = app;
