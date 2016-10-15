// PORT
const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGOLAB_URI || 'mongodb://localhost/roadtrip_plannerDB'

// REQUIRES
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const path = require('path')
const cors = require('cors')

const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackConfig = require('../webpack.config')

require('mongoose').connect(MONGO_URI, err =>{
  if (err) throw err;
  console.log(`MongoDB connected to ${MONGO_URI}`)
})

// APP DECLARATION
const app = express()

// MIDDLEWARE
app.use(morgan('dev'))
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }))
app.use(express.static('src'))
app.use(cors())
app.use((req, res, next) => {
  res.handle = (err, data) => res.status(err ? 400: 200).send(err || data);
  next();
});

// WEBPACK CONFIGURATION
const compiler = webpack(webpackConfig)
app.use(webpackDevMiddleware(compiler, { publicPath: webpackConfig.output.publicPath, noInfo: true }))
app.use(webpackHotMiddleware(compiler))

// ROUTES
app.use('/api', require('./routes/api'));
app.use('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../src/index.html'))
});


// SERVER LISTEN
app.listen(PORT, err => {
  console.log(err || `Server listening on port ${PORT}`)
})
