const express = require('express');
const morgan = require('morgan')
const user_routes = require('./routes/user_routes')
const destination_routes = require('./routes/destination_routes')
const cors = require('cors')
const app = express();
const PORT = 8080;

// middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(cors({
      origin: "https://*.expo.dev",
}));


// api routes
app.use('/api/v1/users', user_routes)
app.use('/api/v1/destinations', destination_routes)


app.get('/', function (req, res) {
      res.status(201).json({
            message: 'Backend is up and running'
      })
})


module.exports = app