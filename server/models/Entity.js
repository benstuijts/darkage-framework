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
    
    entity.validator = function(list, uniqueProperty, value) {
        let flag = false;
        for(let index in list) {
            if(list[index][uniqueProperty] === value ) {
                flag = true;
            }
        }
        return !flag;
    };
    
    entity.mandatory = function(givenOptions, properties) {
        let flag = properties.length;
        for(let option in givenOptions) {
            if(properties.indexOf(option) >= -1) {
                flag--;
            }
        }
        return (flag === 0) ? true : false;
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