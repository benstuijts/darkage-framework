'use strict';
const express     = require('express');
const router      = express.Router();
const jsonfile    = require('jsonfile');
const config  = require('../modules/config-magic/config-magic.js').load('./server/config/config.json');

const Canvas = require('../models/Canvas');

var routes = [
  "worldmap",
  "config",
  "react",
  "game",
];

module.exports = function(io) {

console.log('# test_routes loaded');

io.on('connection', function(socket) { 
    console.log('someone connected... ' + socket.id);
  
  var worldmap = Canvas();

  console.log(worldmap);
  
      
});

router.get('/',function(req,res){
  res.redirect('test/home');
});

router.get('/home', function(req,res){
  res.render('test/index',{
    title: "All routes",
    description: "",
    routes: routes,
    breadcrumb: ["home"]
  });
});

router.get('/react', function(req, res) {
  res.render('test/react', {
    breadcrumb: ["home","react"]
  });
});

router.get('/worldmap', function(req, res){
  res.render('test/worldmap',{
    title: "Worldmap",
    description: "",
    breadcrumb: ["home","worldmap"]

  });
});

router.get('/config', function(req, res){
  res.render('test/config',{
    title: "Config",
    description: "",
    breadcrumb: ["home","config"],
    config_form: config.jsonToHtmlForm()
  });
});

router.get('/game', function(req,res){
  res.render('test/game',{
    title: "Game",
    description: "",
    breadcrumb: ["home","game"],
  });  
});

router.post('/config',function(req, res){
  const body = req.body;

  config.formToJson(body, function(conf) {
    jsonfile.writeFile('./server/config/config.json', conf, {spaces: 2}, function (err) {
      console.error(err);
      if(!err) console.log('config succesfully updated');
      res.send('Config was saved. Please return to the homepage ( <a href="./home">Home<a> ) ');
    });
  });
});

return router;
}
