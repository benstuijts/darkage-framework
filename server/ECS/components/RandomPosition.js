'use strict';
const RandomPosition = function(minX, minY, maxX, maxY) {
    const component = {
        _name: 'randomPosition',
        worldmapX: Math.round(Math.random() * (maxX-minX) + minX),
        worldmapY: Math.round(Math.random() * (maxY-minY) + minY)
    };
    return component;
};

module.exports = RandomPosition;