const express = require('express');
const salesRouter = express.Router();
const {getSales} = require('../controller/sales');

salesRouter.get('/sales', getSales);

module.exports = {
    salesRouter
}