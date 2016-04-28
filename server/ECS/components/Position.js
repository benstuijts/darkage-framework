'use strict';
const Component = require('./Component');

module.exports = function(worldmapX, worldmapY) {
    
    const component = new Component();
    
    component._name = 'position';
    component.worldmapX = worldmapX || 0;
    component.worldmapY = worldmapY || 0;
    
    component.events = {
        'move' : function(position) {
            component.set(position);
        }.bind(this)
    };

    return component;
};

