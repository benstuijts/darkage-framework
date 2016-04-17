'use strict';

const Entity = function(name, type, id) {
    let index = Entity._index++;
    
    /* Properties */
    const entity = {
        _index: index,
        name: name || "",
        type: type || "",
        id: id || "",
        worldmapX: 0,
        worldmapY: 0,

        countAllEntities: function() {
            return Object.keys(Entity.list).length;
        },
        
    };
    
    /* Method destroy */
    entity.destroy = function() {
        delete Entity.list[entity._index];
    };
    
    Entity.list[index] = entity;
    
    return entity;
};
Entity._index = 0;
Entity.list = {};

module.exports = Entity;