'use strict';
const Position = function(worldmapX, worldmapY) {
    const component = {
        _name: 'position',
        worldmapX: worldmapX || 0,
        worldmapY: worldmapY|| 0
    };
    return component;
};

module.exports = Position;