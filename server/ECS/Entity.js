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
Entity.addComponent = function(entity, component) {
    if(typeof component === 'object') {
        entity.components[component._name] = component;
    }
    if(typeof component === 'function') {
        Entity.addComponent(entity, component()) ;
    }
    return this;
};
Entity.addComponents = function(entity, components) {
    for(let component in components) {
        Entity.addComponent(entity, components[component]);
    }
    return this;
};
Entity.removeComponent = function(entity, component) {
    let _name;
    if(typeof component === 'string'){
        _name = component;
    }
    if(typeof component === 'object'){
        _name = component._name;
    }
    if(typeof component === 'function'){
        _name = component()._name.toLowerCase();
    }
    delete entity.components[_name.toLowerCase()];
    return this;
};

module.exports = Entity;