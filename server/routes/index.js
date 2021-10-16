const express = require('express');
const router = express.Router();

const coinRoute = require('./coin.route');

router.use('/coin', coinRoute);

module.exports = router;