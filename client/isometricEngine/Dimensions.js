'use strict';
const Component = require('./Component');
const Rect = require('../models/Rect');

const Dimensions = function(x,y,width, height) {
    
    const component = new Component();

    component._name = "dimensions";
    component.x = x;
    component.y = y;
    component.bounds = new Rect(0,0,width,height);
    
    component.events = {
        
        
        
    };
    
    
    
    return component;
}

module.exports = Dimensions;
