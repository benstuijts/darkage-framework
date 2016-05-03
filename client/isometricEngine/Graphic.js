'use strict';
const Component = require('./Component');
const Rect = require('../models/Rect');

const Graphic = function(src) {
    
    const component = new Component();

    component._name = "graphic";
    component.graphic = new Image();
    //component.graphic.src = src;
    component.currentFrame = 0;
    component.lastFrame = 0;
    
    component.events = {
    
    };
    
    component.draw = function(ctx, x,y) {
        //component.spritesheet, 0,0,128,64
        
        console.log('drawing... ' + this._name + component.graphic);
        
        ctx.drawImage(component.graphic,x,y);
                        
        //return component.image,0,0,component.image.width, component.image.width;
    }
    
    component.initialize = function(cb) {
        let start = new Date();
        component.graphic.src = src;
        component.graphic.onload = function() {
            let duration = new Date() - start;
            console.log('graphic ' + component._name + ' loaded in ' + duration + ' ms.');
            cb();
        }
    };
    
    component.initialize(function() {
        return component;
    });
    
};

module.exports = Graphic;
