const express = require('express');

const routers = express.Router();

/* GET home page. */
routers.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

module.exports = routers;
