'use strict';
const express     = require('express');
const router      = express.Router();
const jsonfile    = require('jsonfile');
const config  = require('../modules/config-magic/config-magic.js').load('./server/config/config.json');

const Player = require('../models/Player');
const Enemy = require('../models/Enemy');

var routes = [
  "worldmap",
  "config",
  "react",
  "game",
];

module.exports = function(io) {

console.log('# test_routes loaded');

const player = Player("Ben", "Speler", "mongodb_id");
const otherplayer = Player("Pepijn", "Speler", "mongodb_id");
const enemy = Enemy.createMultiple(12,"Struikrover");
//enemy[3].destroy();
//enemy.push(enemy[1].copy());
//enemy.push(enemy[6].copy());


//console.log('Entities: ' + player.countAllEntities());
//console.log('Spelers: ' + Player.count());
//console.log('Enemies: ' + Enemy.count());

const GameTime = function() {
  const gametime = {
    turn: 10, //minuten realtime
    turnGT: 120 * 60, // minuten gametime 120 * 60 = 7200 minuten = 120 uur = 5 dagen
  }; 
  
  gametime.RTtoGT = function(RT) {
    return {
      milliseconds: Math.round(((1/(gametime.turnGT/gametime.turn)) * RT) * 60 * 1000),
      seconds: ((1/(gametime.turnGT/gametime.turn)) * RT) * 60,
      minutes: (1/(gametime.turnGT/gametime.turn)) * RT
    };
  };
  
  gametime.GTtoRT = function(GT) {
    return {
      milliseconds: Math.round((gametime.turn / gametime.turnGT) * GT * 60 ),
      seconds: (gametime.turn / gametime.turnGT) * GT * 60,
      minutes: (gametime.turn / gametime.turnGT) * GT,
    }
  }
  
  gametime.timePassed = function(turns) {
    return {
      turns: turns,
      realtime: turns * gametime.turn,
      gametime : {
        milliseconds: turns * gametime.turnGT * 1000,
        minutes: turns * gametime.turnGT,
        hours: turns * gametime.turnGT / 60,
        days: turns * gametime.turnGT / 60 / 24,
        years: turns * gametime.turnGT / 60 / 24 / 365,
      }
    }
  }
  console.log(gametime.turnGT);
  return gametime;
};

const Unit = function() {
  const unit = {
    speed: 5 // 5 km/uur
  };
  
  
  
  unit.travelTime = function(gametime, distanceInMeters) {
    let travelTimeRT = 60 / (unit.speed * 1000 / distanceInMeters);
    let travelTimeGT = gametime.RTtoGT(travelTimeRT).seconds;
    return {
      travelTimeRT: travelTimeRT,
      travelTimeGT: {
        milliseconds: Math.round(travelTimeGT * 1000),
        seconds: travelTimeGT,
        minutes: travelTimeGT / 60,
        hours: travelTimeGT / 60 / 24,
      },
      travelTimeRTString: travelTimeRT + ' seconds', 
      travelTimeGTString: travelTimeGT + ' seconds'
    };
  };
  return unit;
};

const GT = GameTime();
//console.log(GT.timePassed(1)); // 1 dag spelen (144 turns)
//console.log(GT.RTtoGT(60));
console.log(GT.GTtoRT(7200));
const unit = Unit();

console.log(unit.travelTime(GT, 5000));


io.on('connection', function(socket) { 
    console.log('someone connected... ' + socket.id);
  
  
  
      
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
