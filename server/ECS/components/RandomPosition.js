'use strict';

const RandomPosition = function(minX, minY, maxX, maxY) {
    
    const component = {
        _name: 'randomPosition',
        worldmapX: Math.round(Math.random() * (maxX-minX) + minX),
        worldmapY: Math.round(Math.random() * (maxY-minY) + minY),
    };
    
    component.events = {
        'update' : function() {
            console.log('updating the component ' + component._name );
        },
    };
      
    component.on = function(event) {
        if(component.events[event] && typeof component.events[event] === 'function') {
            component.events[event]();
        }
    };
    
    return component;
};

module.exports = RandomPosition;