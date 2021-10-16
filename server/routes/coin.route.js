const express = require('express');
const coinController = require('../controllers/coin.controller');

const router = express.Router();

router
    .route('/coindesk')
    .get(coinController.coindeskCointroller);

module.exports = router;
