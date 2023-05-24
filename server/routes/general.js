const express = require('express');
const generalRouter = express.Router();
const {getUser, getDashboard} = require('../controller/general')


generalRouter.get('/user/:id', getUser);
generalRouter.get('/dashboard', getDashboard);


module.exports = {
    generalRouter
}