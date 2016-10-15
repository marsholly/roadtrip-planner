const express = require ('express')
const router = express.Router()

router.use('/googleApi', require('./googleApi'))

module.exports = router;
