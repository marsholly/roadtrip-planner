const express = require('express');
const router = express.Router();
const Direction = require('../models/direction');


router.route('/directions')
  .get((req, res) => {
    Direction.getInitialRoute(req.query, res.handle);
  })

router.route('/places')
  .get((req, res) => {
    Direction.getPlaces(req.query, res.handle);
  })

module.exports = router;
