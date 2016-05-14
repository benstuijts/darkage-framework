'use strict';
const Component = require('./Component');

const Moveable = function(directionX, directionY, speed) {
    
    const component = new Component();
    
    component._name = 'moveable';
    component.directionX = directionX || 0;
    component.directionY = directionX || 0;
    component.speed = speed || 0;
    
    
    
    component.events = {
        'moveTo' : function(moveTo) {
            this.directionX = moveTo.worldmapX;
            this.directionY = moveTo.worldmapY;
            this.speed = moveTo.speed;
        }.bind(component)
    };
    
    
    
    return component;
};

module.exports = Moveable;