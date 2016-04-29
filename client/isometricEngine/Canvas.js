'use strict';

const Component = require('./Component');

const Canvas = function(canvasId) {
    
    const component = new Component();

    component._name = "canvas";
    component.canvas = document.getElementById(canvasId);
    component.ctx = component.canvas.getContext("2d");
    
    component.events = {
        "resize" : function() {
            console.log('resize ' + this._name);
            this.resize();
        }.bind(component),
        "clear" : function() {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            //component.emit("resize");
        }.bind(component)
    };
    
    component.resize = function() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    component.resize();
    return component;
}

module.exports = Canvas;