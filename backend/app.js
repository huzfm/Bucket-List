const express = require('express');
const morgan = require('morgan')
const user_routes = require('./routes/user_routes')
const app = express();
const PORT = 8080;
app.use(morgan('dev'))
app.use(express.json())
app.use('/api/v1/users', user_routes)


app.get('/', function (req, res) {
      res.status(201).json({
            message: 'Backend is up and running'
      })
})


module.exports = app