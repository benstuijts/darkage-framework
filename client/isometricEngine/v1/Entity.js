'use strict';
const Entity = function() {
    let index = Entity._index++;
    const entity = {
        _id: (+new Date()).toString(16) + (Math.random() * 100000000 | 0).toString(16) + index,
        components: {},
    }
    entity.print = function() {
        console.log(JSON.stringify(this, null, 4));
        return this;    
    };
    
    Entity.list[index] = entity;
    return entity;
}
Entity._index = 0;
Entity.list = {};

module.exports = Entity;