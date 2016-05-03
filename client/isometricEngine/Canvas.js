'use strict';

const Component = require('./Component');

const Canvas = function(canvasId) {
    
    const component = new Component();

    component._name = "canvas";
    component.canvas = document.getElementById(canvasId);
    component.ctx = component.canvas.getContext("2d");
    
    component.events = {
        "resize" : function({ width, height }) {
            console.log('resize ' + this._name + ' to ' + width + ', ' + height);
            this.resize(width, height);
        }.bind(component),
        "clear" : function() {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            //component.emit("resize");
        }.bind(component)
    };
    
    component.resize = function(width, height) {
        this.canvas.width = width;
        this.canvas.height = height;
    };
    
    component.resize(window.innerWidth, window.innerWidth);
    return component;
}

module.exports = Canvas;