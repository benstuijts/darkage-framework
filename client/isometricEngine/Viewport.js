'use strict';
const Component = require('./Component');
const Rect = require('../models/Rect');

const Viewport = function() {
    
    const component = new Component();

    component._name = "viewport";
    component.viewport = new Rect(0,0,100,100);
    
    component.events = {
        
        "resize" : function({ width, height }) {
            console.log('resize ' + this._name + ' to ' + width + ', ' + height);
            this.viewport.width = width;
            this.viewport.height = height;
        }.bind(component),
        
        "move" : function({ deltaX, deltaY }) {
            
        }
        
    };
    
    
    
    return component;
}

module.exports = Viewport;
