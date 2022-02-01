const express = require('express');
const router = express.Router();

const inventoryData = require('./inventory.data');

router.route('/inventory').get((req, res) => {
    res.json(inventoryData);
});

module.exports = router;