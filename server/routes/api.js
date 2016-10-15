const express = require ('express')
const router = express.Router()

router.use('/routeGoesHere', require('./routeGoesHere'))

module.exports = router
