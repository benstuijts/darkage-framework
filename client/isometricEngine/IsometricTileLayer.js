'use strict';
const Component = require('./Component');
const Rect = require('../models/Rect');

const IsometricTileLayer = function(map) {
    
    const component = new Component();

    component._name = "isometrictilelayer";
    component._offCanvas = document.createElement("canvas");
    component._offContext = component._offCanvas.getContext("2d");
    component._offRect = new Rect(0,0,0,0);
    component._offDirty = true;
    component.map = map;
    
    component.events = {
        
        
        
    };
    
    //TIJDELIJK!!!
    
    component.spritesheet = new Image();
    component.spritesheet.src = "/img/terrain.png"
    component.cellWidth = 100;
    component.cellHeight = 50;
    component.test = function() {
        console.log('testing ' + this._name);
    }
    
    // situatie nu: console: game.components.layermanager.layers[0].drawMapRegion(game.get('ctx')) 
    // tekent de map in isometrische verhoudingen
    
    component.drawMapRegion = function(ctx, rect) {
        let startCellX = Math.max(0,0),
            startCellY = Math.max(0, 0),
            endCellX = component.map.length,
            endCellY = component.map[0].length,
            map = component.map;
        
        console.log(map);
        
        for(let cellX=startCellX; cellX<endCellX; cellX++) {
            for(let cellY=startCellY; cellY<endCellY; cellY++) {
                let tile = map[cellX][cellY];
                
                let isoX = (cellX - cellY) * component.cellWidth/2;
                let isoY = ((cellX + cellY) / 2 ) * component.cellHeight;
                
                /*
                if(tile._name == 'tile_grass') {
                    ctx.drawImage(component.spritesheet, 0,0,128,64,isoX, isoY, 128,64);
                }
                if(tile._name == 'tile_path') {
                    ctx.drawImage(component.spritesheet, 0,128,128,64,isoX, isoY, 128,64);
                }
                */
                
                //console.log(tile);
                
                tile.components.graphic.draw(ctx, isoX, isoY);
                
                
                
            }
        }
    };
    
    component.getVisibleMapRect = function() {
        
    };
    
    component.draw = function(ctx, dirtyRect) {
        if(component._offDirty) {
            component.redrawOffScreen();
        }
        
    };
    
    component.redrawOffScreen = function() {
        let ctx = component._offContext;
        ctx.clearRect(0, 0, this._offCanvas.width, this._offCanvas.height);
        this.drawMapRegion(ctx, this._offRect);
        this._offDirty = false;
    };
    
    component.resetOffScreenCanvas = function() {
        this._offRect = component.getVisibleMapRect();
        this._offCanvas.height = this._offRect.height; // * cellHeight!
        this._offCanvas.width = this._offRect.width; // * cellWidth!
        this._offDirty = true;
    };
    
    
    component.setSize = function(width, height) {
        //this.setSize(width, height);
    };
    
    component.setPosition = function(x,y) {
        //this.setPosition(x,y);
    };
    
    component.move = function(deltaX, deltaY) {
        //this.move(deltaX, deltaY);
    };
    
    return component;
};

module.exports = IsometricTileLayer;
