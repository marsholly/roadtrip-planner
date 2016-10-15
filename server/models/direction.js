const axios = require('axios');
require('dotenv').config();

exports.getInitialRoute = (query, cb) => {
  let {origin, destination} = query;
  axios.get(`https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${process.env.GOOGLE_API_KEY}`)
    .then(res => cb(null, res.data))
    .catch(console.error)
}

exports.getPlaces = (query, cb) => {
  let {location, radius, type, keyword} = query;
  axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=${radius}&type=${type}&keyword=${keyword}&key=${process.env.GOOGLE_API_KEY}`)
    .then(res => cb(null, res.data))
    .catch(console.error)
}
