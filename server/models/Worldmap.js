'use strict';

/* Dependencies */
const Rect      = require("./Rect");
const Entity    = require("../ECS/Entity");
const Position  = require("../ECS/components/Position");
const Animated  = require("../ECS/components/Animated");

function EventEmitter() {
  this.events = {}
}
EventEmitter.prototype.on = function(event, fn, callback) {
  if(this.events[event]) {
    this.events[event](callback);
  }
};
EventEmitter.prototype.emit = function(event, callback) {
  this.events[event](callback);
}


/* Constructor */
const Worldmap = function(size, clusterSize) {
    // Coordinaten stelsel:
    // worldX, worldY   [indexes]   Coordinaten in de map     
    // isoX, isoY       [px]        Werkelijke coordinaten op de totale worldmap, isometric projection
    // screenX, screenX [px]        Werkelijke coordinaten op het scherm van de gebruiker
    // rect             [px]        Werkelijke coordinaten op de totale worldmap
    
    this.map = [];
    
    this.size = size;
    this.cluster = [];
    this.clusterSize = clusterSize || 5000; //px -> 5000 x 2500 px isometric
    this.isometric = true;
    this.tileSize = { width: 100, height: 50 };
    this.rect = new Rect(0,0,this.size * this.tileSize.width, this.size * this.tileSize.height);
    this.entity = [];
    this.initializeClusters();
    this.buffer = [];
    this.events = {};
    
    this.addEventListener("update", function(data, callback){
      console.log('updating worldmap' + data);
      callback('done');
    });
    
};

/* Events */
Worldmap.prototype.on = function(event, callback) {
  this.events[event](callback);
};
Worldmap.prototype.addEventListener = function(event, fn) {
  this.events[event] = fn;
}
Worldmap.prototype.emit = function(event, data, callback) {
  if(typeof data === 'object' && callback && typeof callback === 'function') {
    this.events[event](data, callback);
  } else if(typeof data === 'object') {
    this.events[event](data);
  } else {
    this.events[event]();
  }
}

/* Buffer */
Worldmap.prototype.initializeBuffer = function() {
  let x, y;
  // x = even || 0
  for(x=0;x<this.size*2; x=x+2) {
    this.buffer[x] = [];
    for(y=1; y<this.size*2; y++) {
      this.buffer[x][y] = {
        indexX: x,
        indexY: y,
        anchorpointY : Math.round(this.tileSize.height/2) * y,
        entities: [],
      };  
    }
  }
  // y = oneven
  for(x=1; x<this.size*2; x=x+2) {
    this.buffer[x] = [];
    for(y=0; y<this.size*2; y=y+2) {
      this.buffer[x][y] = {
        indexX: x,
        indexY: y,
        anchorpointY : Math.round(this.tileSize.height/2) * y,
        entities: [],
      };
    }
  }
  this.buffer.lastindex = { x:this.size*2, y: this.size * 2 };
};
Worldmap.prototype.createBuffer = function() {
  for(let i=0;i<this.entity.length; i++) {
    //console.log(i + ' => ' + this.entity[i].components.position.isoX + ', ' + this.entity[i].components.position.isoY);
    let entity = this.entity[i].components.position;
    let bufferIndexX = null, bufferIndexY = null;
    
    if(entity.isoY%50 === 0 ) {
      let bufferIndexY = entity.isoY/25;
      let bufferIndexX = entity.isoX/50;
      //this.buffer[bufferIndexX][bufferIndexY] = this.entity[i];
      this.buffer[bufferIndexX][bufferIndexY].entities.push(this.entity[i]);
    } else {
      let bufferIndexY = entity.isoY/25;
      let bufferIndexX = entity.isoX/50;
      //this.buffer[bufferIndexX][bufferIndexY] = this.entity[i];
      this.buffer[bufferIndexX][bufferIndexY].entities.push(this.entity[i]);
    }
  }
};
Worldmap.prototype.updateBuffer = function() {
  
};

Worldmap.prototype.getEntitiesInXDirection = function(indexX, inputRect) {
  let firstIndexY, lastIndexY, responseArray = [];
  if(indexX & 1) {
    console.log('X is oneven');
    firstIndexY   = Math.max(0,Math.floor(inputRect.y / (this.tileSize.height/2) - 1));
    lastIndexY    = Math.ceil((inputRect.y + inputRect.height) / (this.tileSize.height/2) );
  } else {
    console.log('X is even');
    firstIndexY   = Math.max(0,Math.floor(inputRect.y / (this.tileSize.height/2) + 1));
    lastIndexY    = Math.ceil((inputRect.y + inputRect.height) / (this.tileSize.height/2) );
  }
  console.log(`First index y: ${firstIndexY} last index y: ${lastIndexY} index x: ${indexX}`);
  for(let index=firstIndexY; index<lastIndexY; index=index+2) {
    for(let i=0; i<this.buffer[indexX][index].entities.length; i++) {
      responseArray.push(this.buffer[indexX][index].entities[i]);
    }
  }
    console.log('Number of entities  found: ' + responseArray.length);
    console.log(responseArray);
    console.log('--- end list ---' );
  return responseArray;
};

Worldmap.prototype.getEntitiesInYDirection = function(indexY, inputRect) {
  let firstIndexX, lastIndexX, responseArray = [];
  if(indexY & 1) {
        console.log('Y is oneven');
        firstIndexX   = Math.max(0,Math.floor(inputRect.x / (this.tileSize.width/2) - 1));
        lastIndexX    = Math.ceil((inputRect.x + inputRect.width) / (this.tileSize.width/2) );
    
      } else {
        console.log('Y is even');
        firstIndexX   = Math.max(0,Math.floor(inputRect.x / (this.tileSize.width/2) + 1));
        lastIndexX    = Math.ceil((inputRect.x + inputRect.width) / (this.tileSize.width/2) );
      }
      
      console.log(`First index x: ${firstIndexX} last index x: ${lastIndexX} index y: ${indexY}`);

      for(let index=firstIndexX; index<lastIndexX; index=index+2) {
        for(let i=0; i<this.buffer[index][indexY].entities.length; i++) {
          responseArray.push(this.buffer[index][indexY].entities[i]);
        }
      }
      console.log('Number of entities  found: ' + responseArray.length);
      console.log(responseArray);
      console.log('--- end list ---' );
  return responseArray; 
};

Worldmap.prototype.getEntitiesLeftOfRect = function() {
  
};
Worldmap.prototype.getEntitiesRightOfRect = function() {
  
};

Worldmap.prototype.getEntities = function(inputRect, direction) {
  let indexX, indexY, responseArray = [];
  
  // first make sure the input.rect is not larger than the worldmap.rect
  let clientRect = new Rect(
    Math.max(this.rect.x, inputRect.x),
    Math.max(this.rect.y, inputRect.y),
    Math.min(this.rect.width, inputRect.width),
    Math.min(this.rect.height, inputRect.height)
  );
  switch(direction) {
    case 'up':
      indexY        = Math.max(0,Math.floor(inputRect.y / (this.tileSize.height/2)) - 1);
      responseArray = this.getEntitiesInYDirection(indexY, clientRect);
      break;
      
    case 'down':
      indexY        = Math.ceil((clientRect.y + clientRect.height) / (this.tileSize.height/2)); 
      responseArray = this.getEntitiesInYDirection(indexY, clientRect);
      break;
      
    case 'left':
      
      indexX        = Math.max(0,Math.floor(inputRect.x / (this.tileSize.width/2)) - 1);
      responseArray = this.getEntitiesInXDirection(indexX, clientRect);
      break;
    
    case 'right':
      indexX        = Math.ceil((clientRect.x + clientRect.width) / (this.tileSize.width/2));
      responseArray = this.getEntitiesInXDirection(indexX, clientRect);
      break;
  }
  
  return responseArray;
};

/* Clusters */
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

/* Development / Utilities */
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

/* Isometric Calculation */
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
Worldmap.prototype.sortEntities = function(){
    console.log(`Sorting ${this.entity.length} entities...`);
    this.entity.sort(function(a,b){
        let aBounds = a.components.position.rect;
        let bBounds = b.components.position.rect;
        return (aBounds.y + aBounds.height) - (bBounds.y + bBounds.height);
    });
};
/* Initialization */
Worldmap.prototype.randomMap = function() {
  let x,y, start = new Date;
  for(x=0;x<this.size;x++) {
    this.map[x] = [];
    for(y=0;y<this.size; y++) {
      let newEntity = Entity(),
          iso       = this.worldToIso(x,y);
      newEntity._id = `isoX: ${iso.isoX}, isoY: ${iso.isoY}`;
      Entity.addComponents(newEntity, [
        Position({
            worldX: x, worldY: y, 
            isoX: iso.isoX, isoY: iso.isoY, 
            width:this.tileSize.width, height: this.tileSize.height  
        }),
        Animated
      ]);
      // Place entity in isometric world
      this.map[x][y] = newEntity;
      // Save entity in worldmap class
      this.entity.push(newEntity);
      // Place entity in cluster
      for(let clusterX=0; clusterX<this.cluster.length; clusterX++) {
        for(let clusterY=0; clusterY<this.cluster[0].length; clusterY++) {
          let e = newEntity.components;
          let c = this.cluster[clusterX][clusterY];
          if(c.rect.containsPoint(e.position.rect.x, e.position.rect.y)) {
            this.cluster[clusterX][clusterY].entity.push(this.map[x][y]);
            break;
          }
        }
      }
    }
  }
  // sort entities:
    this.sortEntities();
    this.clustersInfo();
  // Create buffer, which holds all entities in isometric projection
      this.initializeBuffer();
      this.createBuffer();
  // buffer
  
  
  
 
  
  
  //this.updateClusters();
  let duration = new Date() - start;
  console.log(`Random map created in ${duration} ms.`);
  
  let bufferRect = new Rect(105,5,100,100);
  let direction = 'right';
  
  console.log(this.getEntities(bufferRect, direction)); 
  
  //console.log(this.buffer);
  
};


module.exports = Worldmap;