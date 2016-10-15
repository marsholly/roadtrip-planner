require('dotenv').config()

// PORT
const PORT = process.env.PORT || 8000

// REQUIRES
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const path = require('path')
const cors = require('cors')

const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackConfig = require('./webpack.config')

// APP DECLARATION
const app = express()

// MIDDLEWARE
app.use(morgan('dev'))
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }))
app.use(express.static('build'))
app.use(cors())

// WEBPACK CONFIGURATION
const compiler = webpack(webpackConfig)
app.use(webpackDevMiddleware(compiler, { publicPath: webpackConfig.output.publicPath, noInfo: true }))
app.use(webpackHotMiddleware(compiler))

// ROUTES
app.use('/api', require('./routes/api'))
app.use('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build/index.html'))
})

// SERVER LISTEN
app.listen(PORT, err => {
  console.log(err || `Server listening on port ${PORT}`)
})
