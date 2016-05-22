'use strict';
const Rect = require('./Rect');
const Position = function( options ) {
    const component = {
        _name : 'position',
        worldX:  options.worldX || 0,
        worldY:  options.worldY || 0,
        isoX:  options.isoX || 0,
        isoY:  options.isoY || 0,
        rect: new Rect(options.isoX, options.isoY, options.width, options.height),
        zIndex: options.zIndex || 0
    };
    return component;
};

module.exports = Position;