'use strict';

const Component = require('./Component');
const Dimensions = require('./Dimensions');
const Graphic = require('./Graphic');
import Entity from './Entity';

const Map = function(options) {
    
    const component = new Component();

    component._name = "map";
    component.map = {};

    component.events = {
        
        "loadMap" : function(map) {
            component.emit("io_loadMap", map);
        }.bind(component),
        
        "gotNewMap" : function(map) {
            console.log('I have a new map, hurry!');
            component.set({map: map});
            console.log(component.get('map'));
        }.bind(component),
        
        "render" : function() {
            component.render();
        }.bind(component),
        
    };
    
    component.render = function() {
        let ctx = component.get('ctx');
        for(let x=0; x<component.map.length; x++ ){
            for(let y=0; y<component.map[0].length; y++) {
                let tile = component.map[x][y];
                component.emit("getGraphic", { id: "" },function(graphic){
                    //context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
                    // spritesheet calculation in graphics component!
                    let screenX = x; // isometric calculations -> method of Entity?
                    let screenY = y;
                    ctx.drawImage(graphic, screenX, screenY );
                });
            }
        }
        
            
    };
    
    /* Map({randomMap: true, sizeX: 3, sizeY: 3}) */
    
    // Iedere tile is een Entity?
    
    
    component.randomMap = function(sizeX, sizeY) {
        const m = [];
        
        let grass = Entity("tile_grass").addComponents(Dimensions(0,0,100,66), Graphic("/img/grass.png"));
        let path = Entity("tile_path").addComponents(Dimensions(0,0,100,66), Graphic("/img/dirt.png"));
        let water = Entity("tile_water").addComponents(Dimensions(0,0,100,66), Graphic("/img/water.png"));
        
        for(let x=0; x<sizeX; x++) {
            m[x] = [];
            for(let y=0; y<sizeY; y++) {
               switch(Math.round(Math.random()*2)) {
                   case 0:
                       m[x][y] = grass;
                       break;
                    case 1:
                        m[x][y] = path;
                        break;
                    case 2:
                        m[x][y] = water;
                        break;
               } 
                
            }
        }
        component.map = m;
    };
    
    component.getMap = function() {
        return this.map;
    };
    
    if(options && options.randomMap && options.randomMap === true) {
        component.randomMap(options.sizeX, options.sizeY);
    }
    
    return component;
}

module.exports = Map;