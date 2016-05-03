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



//const Health = require("../ECS/components/Health");
//const Position = require("../ECS/components/Position");
//const RandomPosition = require("../ECS/components/RandomPosition");
//const Character = require("../ECS/components/Character");
//const Moveable = require("../ECS/components/Moveable");



const entities = [];
//const lib = require('../modules/retrieve');

function addComponent(entity, component) {
  if(typeof component === 'object') {
    entity.components[component._name] = component;
  }
  if(typeof component === 'function') {
    addComponent(entity, component()) ;
  }
}
function addComponents(entity, components) {
  for(let component in components) {
    addComponent(entity, components[component]);
  }
}

const Entity = require("../ECS/v1/Entity");
const Position = require("../ECS/v1/Position");
const Animated = require("../ECS/v1/Animated");
const Rect = require("../models/Rect");

const tile = Entity();
//addComponent(tile, Position);

//addComponents(tile, [
//  Position(2,2),
//  Animated
//]);
tile.print();

function Worldmap(size, clusterSize) {
  this.map = [];
  this.entity = [];
  this.size = size;
  this.cluster = [];
  this.clusterSize = clusterSize || 5000; //px -> 5000 x 2500 px isometric
  this.isometric = true;
  this.tileSize = { width: 100, height: 50 }
  this.initializeClusters();
};

Worldmap.prototype.initializeClusters = function() {
  
  let sizeX = this.size * this.tileSize.width;
  let sizeY = this.size * this.tileSize.height;
  let clusterX = sizeX/this.clusterSize;
  let clusterY = (this.isometric) ? sizeY/(this.clusterSize/2) : this.clusterSize;
  
  for(let x=0; x<clusterX; x++) {
    this.cluster[x] = [];
    for(let y=0; y<clusterY; y++) {
      this.cluster[x][y] = {
        entity: [],
        rect: new Rect(x * this.clusterSize, y * (this.clusterSize/2), this.clusterSize, this.clusterSize/2),
      };
    }
  }
};

Worldmap.prototype.clustersInfo = function() {
  for(let clusterX=0; clusterX<this.cluster.length; clusterX++) {
    for(let clusterY=0; clusterY<this.cluster[0].length; clusterY++) {
      console.log(`Cluster[${clusterX}][${clusterY}] contains ${this.cluster[clusterX][clusterY].entity.length} entities`)      
    }
  }
};

Worldmap.prototype.updateClusters = function(oldEntity, newEntity) {
  let start = new Date;
  // entity has moved or been destroyed, update the clusters
  
  
  for(let clusterX=0; clusterX<this.cluster.length; clusterX++) {
    for(let clusterY=0; clusterY<this.cluster[0].length; clusterY++) {
      // First remove old entity
      for(let i=0; i<this.cluster[clusterX][clusterY].entity.length; i++) {
        if(this.cluster[clusterX][clusterY].entity[i]._id == oldEntity._id) {
          this.cluster[clusterX][clusterY].entity.splice(i, 1);
        }
      }
      // Place new entity in cluster
      if(this.cluster[clusterX][clusterY].rect.containsPoint(newEntity.components.position.rect.x,newEntity.components.position.rect.y)) {
        this.cluster[clusterX][clusterY].entity.push(newEntity);
        break;
      }
    }
  }
  
  let duration = new Date() - start;
  console.log(`Updating clusters in ${duration} ms.`);
};
Worldmap.prototype.showSizeOfWorldmap = function() {
  let sizeX = this.size * this.tileSize.width;
  let sizeY = this.size * this.tileSize.height;
  console.log(`(0,0)-(${sizeX},${sizeY})`);
};
Worldmap.prototype.countEntities = function() {
  console.log(Object.keys(this.entity).length);
}
Worldmap.prototype.print = function() {
  console.log(JSON.stringify(this, null, 4));
  return this;    
};
Worldmap.prototype.worldToIso = function(worldX, worldY) {
  /* Let op: De worldmap wordt verplaatst naar 0,0 */
  let isoX = ( worldX - worldY ) * this.tileSize.width/2 ;
  let isoY = ((worldX + worldY) / 2 ) * this.tileSize.height;
  
  isoX += (this.size * this.tileSize.width / 2) - (this.tileSize.width / 2);
  
  return {
    isoX: Math.round(isoX),
    isoY: Math.round(isoY)
  };
};
Worldmap.prototype.isoToWorld = function(isoX, isoY) {
  isoX -= (this.size * this.tileSize.width / 2) - (this.tileSize.width / 2);
  let worldX = ((2 * isoY + isoX) / 2) / this.tileSize.width * 2;
  let worldY = ((2 * isoY - isoX) / 2) / this.tileSize.height;
  return {
    worldX: Math.round(worldX),
    worldY: Math.round(worldY)
  }
}
Worldmap.prototype.randomMap = function() {
  let x,y, start = new Date;
  for(x=0;x<this.size;x++) {
    this.map[x] = [];
    for(y=0;y<this.size; y++) {
      let t = Entity();
      let iso = this.worldToIso(x,y);
      addComponents(t, [
        Position({worldX: x, worldY: y, isoX: iso.isoX, isoY: iso.isoY, width:this.tileSize.width, height: this.tileSize.height  }),
        Animated
      ]);
      // Place entity in isometric world
      this.map[x][y] = t;
      // Save entity in worldmap class
      this.entity.push(t);
      // Place entity in cluster
      for(let clusterX=0; clusterX<this.cluster.length; clusterX++) {
        for(let clusterY=0; clusterY<this.cluster[0].length; clusterY++) {
          let e = t.components;
          let c = this.cluster[clusterX][clusterY];
          if(c.rect.containsPoint(e.position.rect.x, e.position.rect.y)) {
            this.cluster[clusterX][clusterY].entity.push(this.map[x][y]);
            break;
          }
        }
      }
      
      
      
      
    }
  }
  
  this.clustersInfo();
  
  //this.updateClusters();
  let duration = new Date() - start;
  console.log(`Random map created in ${duration} ms.`);
}

const newbie = new Worldmap(4, 200);
newbie.randomMap();
//newbie.print();
newbie.cluster[0][0].entity[4]._id = "tracker";
//newbie.cluster[0][0].entity[4].components.position._name = "tracker";
console.log(newbie.cluster[0][0].entity[4]);
// entity verplaatsen naar isometrische coördinaten (200,75)
let oldEntity = newbie.cluster[0][0].entity[4];
let newEntity = newbie.cluster[0][0].entity[4];
newEntity.components.position.rect.x = 200;
newEntity.components.position.rect.y = 75;


// dit gaat goed, alleen nog de entities binnen het cluster sorteren op een x en vooral y waarde.
newbie.updateClusters(oldEntity, newEntity);


newbie.countEntities();
newbie.showSizeOfWorldmap();

//console.log(retrieve.get('enemy.ridder'));
/*
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
*/
/*
for(var i=0; i<10;i++) {
  entities.push(Entity()
                .addComponents(
                  Character("Enemy #"+i),
                  Position(10,20),
                  Moveable()
                )
  );
  
}
*/
//entities[0].print();
//entities[0].emit('update');
//entities[0].print();

//const highwayman = Entity().define().addComponents(Character(), Moveable);
// Je kunt niet direct chainen na addComponents!
//highwayman.emit('update');

//entities.push(highwayman);
//entities.push(Entity().addComponent(Character("Ben")));
//entities.push(highwayman);

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
