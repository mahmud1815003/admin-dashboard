const express = require('express');
const clientRouter = express.Router();
const {getProduct, getGeography, getCustomer, getTransaction} = require("../controller/client");

clientRouter.get('/products', getProduct);
clientRouter.get('/customers', getCustomer);
clientRouter.get('/transactions', getTransaction);
clientRouter.get('/geography', getGeography);

module.exports = {
    clientRouter
}