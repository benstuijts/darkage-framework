'use strict';

/* Dependencies */
const colors    = require('colors');
const Rect      = require("./Rect");
const Entity    = require("../ECS/Entity");
const Position  = require("../ECS/components/Position");
const Graphic   = require("../ECS/components/Graphic");
const Meta      = require("../ECS/components/Meta");

/* Worldmap tiles */
const tiles     = require("../config/nature/worldmapTiles");

/* Pre programmed units: */
const simple_soldier = require("../config/unit/simple_soldier.js");

/* Gamestuff loader */
const Lookup    = require("./Lookup.js").add({tiles: tiles});

module.exports = function(size, tileSize) {
    const worldmap = {
        size: size || 4,
        name: "worldmap",
        tileSize: tileSize || { width: 100, height: 50 },
        map: [],
        entity: [],
        buffer: {},
        create: {},
        utils: {},
    };
    
    worldmap.buffer.init = function() {
        let x,y;
        for(x = 0; x < worldmap.size*2; x=x+2) {
            worldmap.buffer[x] = [];
            for(y=1; y < worldmap.size*2; y++) {
                worldmap.buffer[x][y] = {
                    indexX: x,
                    indexY: y,
                    anchorpointY : Math.round(worldmap.tileSize.height/2) * y,
                    entities: [],
                };  
            }      
        }
        for(x = 1; x < worldmap.size*2; x=x+2) {
            worldmap.buffer[x] = [];
            for(y = 0; y < worldmap.size*2; y=y+2) {
                worldmap.buffer[x][y] = {
                    indexX: x,
                    indexY: y,
                    anchorpointY : Math.round(worldmap.tileSize.height/2) * y,
                    entities: [],
                };
            }
        }
        worldmap.buffer.lastIndex = {
            x: worldmap.size * 2 - 1, 
            y: worldmap.size * 2
        };
    }.bind(worldmap);
  
    worldmap.buffer.update = function() {
        let widthOfOneUnitInBuffer  = Math.round(worldmap.tileSize.width / 2);
        let heightOfOneUnitInBuffer = Math.round(worldmap.tileSize.height / 2);
  
        for(let i = 0;i < worldmap.entity.length; i++) {
            let entity = worldmap.entity[i].components.position;
            if(entity.isoY%widthOfOneUnitInBuffer === 0 ) {
                let bufferIndexY = Math.floor(entity.isoY/heightOfOneUnitInBuffer);
                let bufferIndexX = Math.floor(entity.isoX/widthOfOneUnitInBuffer);
      
                worldmap.entity[i].buffer = {x:bufferIndexX, y:bufferIndexY };
                worldmap.buffer[bufferIndexX][bufferIndexY].entities.push(this.entity[i]);
            } else {
                let bufferIndexY = Math.floor(entity.isoY/heightOfOneUnitInBuffer);
                let bufferIndexX = Math.floor(entity.isoX/widthOfOneUnitInBuffer);
      
                worldmap.entity[i].buffer = {x:bufferIndexX, y:bufferIndexY };
                worldmap.buffer[bufferIndexX][bufferIndexY].entities.push(this.entity[i]);
            }
        }
    }.bind(worldmap);

    worldmap.create.tile = function(worldX, worldY, name) {
        console.log("create tile " + name + " on " + worldX, worldY);
        worldX = Math.round(worldX), worldY = Math.round(worldY);
        if(!name) {
            return {
                tile: null,
                error: "No name of tile specified!"
            };
        }
        // check if coordinates exists in worldmap
        if(worldX < 0 || worldY < 0 || worldX > worldmap.map.length-1 || worldY > worldmap.map[0].length-1 ) {
            return {
                tile: null,
                error: `worldX (${worldX}) or worldY (${worldY}) coordinates do not exists`
            };
        }
        let newEntity = Entity();
        let iso       = worldmap.utils.worldToIso(worldX,worldY);
        Entity.addComponents(newEntity, [
            Position({
                worldX: worldX, worldY: worldY, 
                isoX: iso.isoX, isoY: iso.isoY, 
                width:worldmap.tileSize.width, height: worldmap.tileSize.height  
            }),
            Graphic(Lookup.get("tiles." + name + ".graph")),
            Meta(Lookup.get("tiles." + name + ".meta"))
            ]);
                
        worldmap.map[worldX][worldY] = newEntity;
        worldmap.entity.push(newEntity);
        worldmap.update();
        return {
            tile: newEntity,
            error: null
        };
    }.bind(worldmap);    

    worldmap.create.unit = function(worldX, worldY, name) {}.bind(worldmap);

    worldmap.utils.worldToIso = function(worldX, worldY) {
        let isoX = ( worldX - worldY ) * worldmap.tileSize.width/2 ;
        let isoY = ((worldX + worldY) / 2 ) * worldmap.tileSize.height;
  
        isoX += (worldmap.size * worldmap.tileSize.width / 2) - (worldmap.tileSize.width / 2);
  
        return {
            isoX: Math.round(isoX),
            isoY: Math.round(isoY)
        };        
    }.bind(worldmap);

    worldmap.utils.isoToWorld = function(isoX, isoY) {
        isoX -= (worldmap.size * worldmap.tileSize.width / 2) - (worldmap.tileSize.width / 2);
        let worldX = ((2 * isoY + isoX) / 2) / worldmap.tileSize.width * 2;
        let worldY = ((2 * isoY - isoX) / 2) / worldmap.tileSize.height;
        return {
            worldX: Math.round(worldX),
            worldY: Math.round(worldY)
        };
    }.bind(worldmap);
    
    worldmap.utils.chooseRandomTileName = function() {
      //let keys = Object.keys(Lookup.getAll());
      let keys = Object.keys(Lookup.get("tiles"));
      return keys[Math.floor(Math.random()*keys.length)];
      
    };
    
    worldmap.utils.randomMap = function() {
        let x,y;
        
        for(x = 0;x < worldmap.size;x++) {
            worldmap.map[x] = [];
            for(y = 0;y < worldmap.size; y++) {
                let newEntity = Entity();
                let iso       = worldmap.utils.worldToIso(x,y);
                
                let name = worldmap.utils.chooseRandomTileName();
                
                Entity.addComponents(newEntity, [
                    Position({
                        worldX: x, worldY: y, 
                        isoX: iso.isoX, isoY: iso.isoY, 
                        width:worldmap.tileSize.width, height: worldmap.tileSize.height  
                    }),
                    Graphic(Lookup.get("tiles." + name + ".graph")),
                    Meta(Lookup.get("tiles." + name + ".meta"))
                ]);
                
                worldmap.map[x][y] = newEntity;
                worldmap.entity.push(newEntity);
                
            }
        }
        worldmap.utils.sortEntities();
        worldmap.buffer.update();
    }.bind(worldmap);
    
    worldmap.utils.sortEntities = function() {
            worldmap.entity.sort(function(a,b){
                let aBounds = a.components.position.rect;
                let bBounds = b.components.position.rect;
                return (aBounds.y + aBounds.height) - (bBounds.y + bBounds.height);
            });
    }.bind(worldmap);
    
    worldmap.update = function() {
        worldmap.utils.sortEntities();
        worldmap.buffer.update();
    }.bind(worldmap);
    
    worldmap.initialize = function() {
        worldmap.rect = new Rect(0,0,worldmap.size * worldmap.tileSize.width, worldmap.size * worldmap.tileSize.height);
        worldmap.buffer.init();
    };
  
    worldmap.initialize();
    return worldmap;
};


/*
module.exports = function(Pubsub, size, tileSize) {
    let map = {
        map: [],
        size: size,
        isometric: true,
        tileSize: tileSize || { width: 100, height: 50 },
        entity: [],
        buffer: []
    };
    
    
    map.initialize = function() {
        map.rect = new Rect(0,0,map.size * map.tileSize.width, map.size * map.tileSize.height);
        map.entity[0] = Entity();
        map._buffer.initialize();
        console.log(map._buffer);
        library.subscribe(tiles,"dirt", { graph: "grsaphics"}, {"mountain": {graph: "highmountains"}});
        // WERKT NOG NIET:
        console.log( library.get("grass.graph.type"));

    };
    
    map._buffer = {
        initialize: function() {
            let x, y;
            // x = even || 0
            for(x = 0; x < map.size * 2; x = x + 2) {
                map.buffer[x] = [];
                for(y = 1; y < map.size * 2; y++) {
                    map.buffer[x][y] = {
                        indexX: x,
                        indexY: y,
                        anchorpointY : Math.round(map.tileSize.height/2) * y,
                        entities: [],
                    };  
                }
            }
            // y = oneven
            for(x = 1; x < map.size * 2; x = x + 2) {
                map.buffer[x] = [];
                for(y = 0; y < map.size * 2; y = y + 2) {
                    map.buffer[x][y] = {
                        indexX: x,
                        indexY: y,
                        anchorpointY : Math.round(map.tileSize.height/2) * y,
                        entities: [],
                    };
                }
            }
            map.buffer.lastindex = { x:map.size*2, y: map.size * 2 };           
        },
        
        update: function() {
            
        }
    };
    
    map._entities = {
        create: {
            tile: function(worldX, worldY, name) {
                let entity = Entity(), calc = map._utils.worldToIso(worldX, worldY);
                Entity.addComponents(entity, [
                    Position({
                        worldX: worldX, worldY: worldY, 
                        isoX: calc.isoX, isoY: calc.isoY, 
                        width:map.tileSize.width, height: map.tileSize.height 
                    }),
                    
                ]);
                //console.log(entity);
            },
            unit: function(mapX, mapY, name) {
                
            }
        },
        
        count: function() {
            console.log(`There are ${Object.keys(map.entity).length} entities in this map.`.blue);
        },
        
        get: function(inputRect, direction) {
            let indexX, indexY, responseArray = [];
  
            // first make sure the input.rect is not larger than the worldmap.rect
            let clientRect = new Rect(
                Math.max(map.rect.x, inputRect.x),
                Math.max(map.rect.y, inputRect.y),
                Math.min(map.rect.width, inputRect.width),
                Math.min(map.rect.height, inputRect.height)
            );
            
            switch(direction) {
                case 'up':
                    indexY        = Math.max(0,Math.floor(inputRect.y / (map.tileSize.height/2)) - 1);
                    responseArray = map.getInYDirection(indexY, clientRect);
                break;
      
                case 'down':
                    indexY        = Math.ceil((clientRect.y + clientRect.height) / (map.tileSize.height/2)); 
                    responseArray = this.getInYDirection(indexY, clientRect);
                break;
      
                case 'left':
                    indexX        = Math.max(0,Math.floor(inputRect.x / (map.tileSize.width/2)) - 1);
                    responseArray = map.getInXDirection(indexX, clientRect);
                break;
    
                case 'right':
                    indexX        = Math.ceil((clientRect.x + clientRect.width) / (map.tileSize.width/2));
                    responseArray = map.getInXDirection(indexX, clientRect);
                break;
            }
  
            return responseArray;
        },
        
        sort: function() {
            map.entity.sort(function(a,b){
                let aBounds = a.components.position.rect;
                let bBounds = b.components.position.rect;
                return (aBounds.y + aBounds.height) - (bBounds.y + bBounds.height);
            });   
        },
        
        getInXDirection: function(indexX, inputRect) {
            let firstIndexY, lastIndexY, responseArray = [];
            if(indexX & 1) {
                console.log('X is oneven');
                firstIndexY   = Math.max(0,Math.floor(inputRect.y / (map.tileSize.height/2) - 1));
                lastIndexY    = Math.ceil((inputRect.y + inputRect.height) / (map.tileSize.height/2) );
            } else {
                console.log('X is even');
                firstIndexY   = Math.max(0,Math.floor(inputRect.y / (map.tileSize.height/2) + 1));
                lastIndexY    = Math.ceil((inputRect.y + inputRect.height) / (map.tileSize.height/2) );
            }
              console.log(`First index y: ${firstIndexY} last index y: ${lastIndexY} index x: ${indexX}`);
            for(let index=firstIndexY; index<lastIndexY; index=index+2) {
                for(let i=0; i<map.buffer[indexX][index].entities.length; i++) {
                    responseArray.push(map.buffer[indexX][index].entities[i]);
                }
            }
                console.log('Number of entities  found: ' + responseArray.length);
                console.log(responseArray);
                console.log('--- end list ---' );
            return responseArray; 
        },
        
        getInYDirection: function(indexY, inputRect) {
            let firstIndexX, lastIndexX, responseArray = [];
            if(indexY & 1) {
                console.log('Y is oneven');
                firstIndexX   = Math.max(0,Math.floor(inputRect.x / (map.tileSize.width/2) - 1));
                lastIndexX    = Math.ceil((inputRect.x + inputRect.width) / (map.tileSize.width/2) );
            } else {
                console.log('Y is even');
                firstIndexX   = Math.max(0,Math.floor(inputRect.x / (map.tileSize.width/2) + 1));
                lastIndexX    = Math.ceil((inputRect.x + inputRect.width) / (map.tileSize.width/2) );
            }
            console.log(`First index x: ${firstIndexX} last index x: ${lastIndexX} index y: ${indexY}`);

            for(let index=firstIndexX; index<lastIndexX; index=index+2) {
                for(let i=0; i<map.buffer[index][indexY].entities.length; i++) {
                    responseArray.push(map.buffer[index][indexY].entities[i]);
                }
            }
            
                console.log('Number of entities  found: ' + responseArray.length);
                console.log(responseArray);
                console.log('--- end list ---' );
            return responseArray;             
        },
        
    };

    map._utils = {
        
        showSize: function() {
            let sizeX = map.size * map.tileSize.width;
            let sizeY = map.size * map.tileSize.height;
            console.log(`SIZE: (0,0)-(${sizeX},${sizeY})`.blue);
        },
        
        worldToIso: function(worldX, worldY) {
            
            let isoX = ( worldX - worldY ) * map.tileSize.width/2 ;
            let isoY = ((worldX + worldY) / 2 ) * map.tileSize.height;
          
            isoX += (map.size * map.tileSize.width / 2) - (map.tileSize.width / 2);
          
            return {
                isoX: Math.round(isoX),
                isoY: Math.round(isoY)
            };  
        },
        
        isoToWorld: function(isoX, isoY) {
            isoX -= (map.size * map.tileSize.width / 2) - (map.tileSize.width / 2);
            let worldX = ((2 * isoY + isoX) / 2) / map.tileSize.width * 2;
            let worldY = ((2 * isoY - isoX) / 2) / map.tileSize.height;
            return {
                worldX: Math.round(worldX),
                worldY: Math.round(worldY)
            };
        },
        
        randomMap: function() {
            let x,y, start = new Date;
            for(x = 0; x < map.size; x++) {
                map.map[x] = [];
            for(y = 0; y < map.size; y++) {
                let newEntity = Entity(),
                iso       = this.worldToIso(x,y);
                newEntity._id = `isoX: ${iso.isoX}, isoY: ${iso.isoY}`;
      
                let type = Math.round(Math.random()*3+1);
                let graph = {}, meta = {};
      
                switch(Math.round(Math.random()*3+1)) {
                    case 0:
          
                  // In de nieuwe situatie wordt dit dan:
                  // this.create.tile(x,y,"grass");
                  
                  graph = {
                    type: "spritesheet",
                    image: {
                      "idle": {
                        src:"./images/worldmap/nature/land_spritesheet_idle_400x100.png",
                        width: 100, height: 100,
                        xpos: 0, ypos: 0
                      }
                    }
                  };
                  meta = {
                    name: "grass"
                  };
                  break;
                case 1:
                  graph = {
                    type: "spritesheet",
                    image: {
                      "idle": {
                        src:"./images/worldmap/nature/land_spritesheet_idle_400x100.png",
                        width: 100, height: 100,
                        xpos: 200, ypos: 0
                      }
                    }
                  };
                  meta = {
                    name: "dense forest"
                  };
                  break;
                case 2:
                  graph = {
                    type: "spritesheet",
                    image: {
                      "idle": {
                        src:"./images/worldmap/nature/land_spritesheet_idle_400x100.png",
                        width: 100, height: 100,
                        xpos: 300, ypos: 0
                      }
                    }
                  };
                  meta = {
                    name: "forest"
                  };
                  break;
                default:
                  graph = {
                    type: "animation",
                    image: {
                      "idle": {
                        src:"./images/worldmap/nature/water_idle_100x100.png",
                        width: 100, height: 100,
                        xpos: 0,ypos: 0
                      }
                    }
                  };
                  meta = {
                    name: "water"
                  };
                  break;
              }
      
      
                Entity.addComponents(newEntity, [
                    Position({
                        worldX: x, worldY: y, 
                        isoX: iso.isoX, isoY: iso.isoY, 
                        width:map.tileSize.width, height: map.tileSize.height  
                    }),
                    Graphic(graph),
                    Meta(meta)
                ]);
                
                // Place entity in isometric world
                map.map[x][y] = newEntity;
                // Save entity in worldmap class
                map.entity.push(newEntity);
            }
            }
  
  // Wat losse entities plaatsen:
  
  let enemy = new Entity();
      enemy._id = "enemy1 260, 65";
  Entity.addComponents(enemy, [
      Position({
          worldX: 5, worldY: 5, 
          isoX: 260, isoY: 65, 
          width:map.tileSize.width, height: map.tileSize.height  
      })
  ]);    
  Entity.addComponents(enemy, simple_soldier);
  map.entity.push(enemy);
  
    // sort entities:
    map._entities.sort();
    map.updateBuffer();
    let duration = new Date() - start;
    console.log(`Random map created in ${duration} ms.`);
 
        }
        
    };

    
    Pubsub.on("update", map._buffer.update);

    map.initialize();
    return map;
};

*/