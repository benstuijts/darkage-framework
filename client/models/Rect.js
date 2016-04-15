'use strict';
const Rect = function(x,y,w,h) {
    const rect = {
        x: x,
        y: y,
        width: w,
        height: h,
    };
    
    rect.copy = function() {
        return Rect(this.x, this.y, this.width, this.height);
    };
    rect.equals = function(r2) {
        return (this.x == r2.x
        && this.y == r2.y
        && this.width == r2.width
        && this.height == r2.height);
    };
    rect.toString = function() {
        return ("[x=" + this.x + ", y=" + this.y + ", width=" + this.width + ", height=" + this.height + "]");
    };
    rect.intersects = function(x2,y2,w2,h2) {
        if (arguments.length == 1) {
        let r = x2;
        x2 = r.x;
        y2 = r.y;
        w2 = r.width;
        h2 = r.height;
    }

    return (this.x <= x2 + w2 && this.x + this.width >= x2 &&
        this.y <= y2 + h2 && this.y + this.height >= y2);
    };
    rect.covers = function(x2,y2,w2,h2) {
        if (arguments.length == 1) {
        let r = x2;
        x2 = r.x;
        y2 = r.y;
        w2 = r.width;
        h2 = r.height
    }
    return (x2 >= this.x && y2 >= this.y && x2 + w2 <= this.x + this.width && y2 + h2 <= this.y + this.height);
    };
    rect.convexHull = function(x2,y2,w2,h2) {
        if (arguments.length == 1) {
        let r = x2;
        x2 = r.x;
        y2 = r.y;
        w2 = r.width;
        h2 = r.height
    }

    let x = Math.min(this.x, x2);
    let y = Math.min(this.y, y2);
    let width = Math.max(this.x + this.width, x2 + w2) - x;
    let height = Math.max(this.y + this.height, y2 + h2) - y;

    return Rect(x, y, width, height);
    };
    rect.intersection = function(x2,y2,w2,h2) {
        if (arguments.length == 1) {
        let r = x2;
        x2 = r.x;
        y2 = r.y;
        w2 = r.width;
        h2 = r.height
    }

    let x = Math.max(this.x, x2);
    let y = Math.max(this.y, y2);
    let width = Math.min(this.x + this.width, x2 + w2) - x;
    let height = Math.min(this.y + this.height, y2 + h2) - y;

    if (width <= 0 || height <= 0)
        return null;

    return Rect(x, y, width, height);
    };
    rect.containsPoint = function(x,y) {
        return x >= this.x && x < this.x + this.width &&
        y >= this.y && y < this.y + this.height;
    };
    rect.getOverlappingGridCells = function(cellW, cellH, cellsInRow, cellsInColumn) {
        let rectX = Math.max(0, Math.floor(this.x/cellW));
        let rectY = Math.max(0, Math.floor(this.y/cellH));
        let rectWidth = Math.min(cellsInRow - rectX, Math.floor((this.x + this.width)/cellW) - rectX + 1);
        let rectHeight = Math.min(cellsInColumn - rectY, Math.floor((this.y + this.height)/cellH) - rectY + 1);
        return Rect(rectX, rectY, rectWidth, rectHeight);
    };
    
    rect.setHeight = function(h) {
        this.height = h;
    };
    rect.setWidth = function(w) {
        this.width = w;
    };
    return rect;
}

module.exports = Rect;

