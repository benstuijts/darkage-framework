const Rect = require('./Rect');
const Canvas = function() {
    const canvas = Rect(0,0,320,200);
    canvas.canvas = 'document.createElement("canvas")';
    canvas.ctx = 'this.htmlObject.getContext("2d")';
    
    canvas.resize = function() {
        
    }
    return canvas;
};

module.exports = Canvas;