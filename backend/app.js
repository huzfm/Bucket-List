const express = require('express');
const morgan = require('morgan')
const app = express();
const PORT = 8080;
app.use(morgan('dev'))
app.get('/', function (req, res) {
      res.send("Hello from backend")
})


module.exports = app