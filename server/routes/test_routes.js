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

const Gameserver = require('../models/Gameserver');

const gameserver = [];
gameserver.push(Gameserver({meta: {name: 'Test Server'}}));
gameserver.push(Gameserver({meta: {name: 'Master Server'}}));
gameserver.push(Gameserver({meta: {name: 'Hero Server'}}));
gameserver.push(Gameserver({meta: {name: 'Newbie Server 1'}}));
gameserver.push(Gameserver({meta: {name: 'Newbie Server 2'}}));
gameserver[0].setGametime(1,7200);
gameserver[1].setGametime(0.5,7200);
gameserver[2].setGametime(10,7200);
gameserver[3].setGametime(12,7200);
gameserver[4].setGametime(15,7200);

gameserver[0].registerPlayer({_id:12},function(error, message) {
  if(error) { console.log('!! ERROR !! '+ message);
  } else {
    console.log('player succesfully registered on the server ');
  } 
});

gameserver[0].authenticatePlayer({_id:12},function(error, message) {
  if(error) { console.log('!! ERROR !! '+ message);
  } else {
    console.log('player succesfully authenticaded on the server ');
  } 
});
gameserver[0].deleteInactivePlayers([{_id:1},{_id:12}]);


const Entity = require("../ECS/Entity");
const Health = require("../ECS/components/Health");
const Position = require("../ECS/components/Position");
const RandomPosition = require("../ECS/components/RandomPosition");
const Character = require("../ECS/components/Character");
const Moveable = require("../ECS/components/Moveable");



const entities = [];
const lib = require('../modules/retrieve');



//console.log(retrieve.get('enemy.ridder'));
lib.set('enemy.ridder.hp', 99);
console.log(lib.get('enemy.ridder'));
lib.add('enemy', {
  viking: {
    hp: 30,
    speed: 1,
    attack: 2,
    armor: 1
  }
});
console.log(lib.get('enemy'));


for(var i=0; i<10;i++) {
  entities.push(Entity()
                .addComponents(
                  Character("Enemy #"+i),
                  Position(10,20),
                  Moveable()
                )
  );
  
}
//entities[0].print();
//entities[0].emit('update');
//entities[0].print();

const highwayman = Entity().define().addComponents(Character(), Moveable);
// Je kunt niet direct chainen na addComponents!
//highwayman.emit('update');

entities.push(highwayman);
entities.push(Entity().addComponent(Character("Ben")));
entities.push(highwayman);

//entities[10].print();


/*
const entity = Entity();
entity.print();

entity.addComponent(Health);
entity.addComponent(Position);
entity.print();

//entity.removeComponent(Health);
entity.set( { worldmapX: 80, worldmapY: 666, hp: 900 } );

entity.print();
*/

const Unit = function() {
  const unit = {
    speed: 5 // 5 km/uur
  };
  
    
  // This function is not independent on the tileSize
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

//const GT = GameTime();
//console.log(GT.timePassed(1)); // 1 dag spelen (144 turns)
//console.log(GT.RTtoGT(60));
//console.log(GT.GTtoRT(7200));
//const unit = Unit();

//console.log(unit.travelTime(GT, 5000));


io.on('connection', function(socket) { 
    //console.log('someone connected... ' + socket.id);
  
  socket.on("loadMap", function(map, cb){
    console.log(map);
    cb('this map comes from the server...');
  });
  
  require('../login/login')(socket);
  
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
