'use strict';
const express     = require('express');
const router      = express.Router();
module.exports = function(io) {
  console.log('# game_routes loaded');

  router.get('/', function(req, res){
    res.send('<h1>Hello Darkage Framework!</h1>');
  });
  
  return router;
};
