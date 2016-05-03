'use strict';
const Component = require('./Component');

const Render = function() {
    
    const component = new Component();

    component._name = "render";
    
    
    component.events = {
        
        
        
    };
    
    
    
    component.animate = function() {
        requestAnimationFrame(boundAnimate);
        component.updateWorld();
        component.renderFrame();
    };
    
    const boundAnimate = component.animate;
    
    component.updateWorld = function() {
        component.emit("update");
    };
    
    component.renderFrame = function() {
        let ctx = component.get('ctx');
        
        ctx.save();
        component.emit("render", {ctx: ctx})
        // first render the background(tilesmap) -> depends on map component
        //  1. Ground textures (grass, rock, desert, water)
        //  2. Roads
        //  2. Nature elements (trees, rocks, mountains)
        // then render the objects
        ctx.restore();
    };
    
    component.initialize = function()  {
        
    };
    
    
    component.initialize();
    return component;
};

module.exports = Render;
