'use strict';

/* Dependencies */
const Rect      = require("./Rect");
const Entity    = require("../ECS/v1/Entity");
const Position  = require("../ECS/v1/Position");
const Animated  = require("../ECS/v1/Animated");

/* Constructor */
const Worldmap = function(size, clusterSize) {
    this.map = [];
    this.entity = [];
    this.size = size;
    this.cluster = [];
    this.clusterSize = clusterSize || 5000; //px -> 5000 x 2500 px isometric
    this.isometric = true;
    this.tileSize = { width: 100, height: 50 }
    this.initializeClusters();
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
  
  //this.updateClusters();
  let duration = new Date() - start;
  console.log(`Random map created in ${duration} ms.`);
}


module.exports = Worldmap;