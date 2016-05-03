'use strict';
const Component = require('./Component');
const Rect = require('../models/Rect');

const LayerManager = function() {
    
    const component = new Component();

    component._name = "layermanager";
    component.layers = [];
    
    component.events = {
        "render" : function({ctx}) {
            component.draw(ctx);
        }.bind(component)
        
        
    };
    
    component.addLayer = function(layer) {
        this.layers.push(layer);
    };
    
    component.draw = function(ctx) {                // dirtyRect doorgeven
        for(let i=0; i<this.layers.length; i++) {
            this.layers[i].draw(ctx);               // dirtyRect doorgeven
        }
    };
    
    component.setSize = function(width, height) {
        for(let i=0; i<this.layers.length; i++) {
            //this.layers[i].setSize(width, height);
        }    
    };
    
    component.setPosition = function(x,y) {
        for(let i=0; i<this.layers.length; i++) {
            //this.layers[i].setPosition(x,y);
        }
    };
    
    component.move = function(deltaX, deltaY) {
        for(let i=0; i<this.layers.length; i++) {
            //this.layers[i].move(deltaX, deltaY);
        }
    };
    
    return component;
}

module.exports = LayerManager;
