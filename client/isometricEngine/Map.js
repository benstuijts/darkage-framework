'use strict';

const Component = require('./Component');

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
        }.bind(component)
    };
    
    /* Map({randomMap: true, sizeX: 3, sizeY: 3}) */
    component.randomMap = function(sizeX, sizeY) {
        const m = [];
        for(let x=0; x<sizeX; x++) {
            m[x] = [];
            for(let y=0; y<sizeY; y++) {
                m[x][y] = 0;
            }
        }
        component.map = m;
    }

    if(options && options.randomMap && options.randomMap === true) {
        component.randomMap(options.sizeX, options.sizeY);
    }
    
    return component;
}

module.exports = Map;