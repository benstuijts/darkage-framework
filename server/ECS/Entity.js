'use strict';
Object.prototype.hasOwnProperty = function(property) {
    return this[property] !== undefined;
};
const Entity = function() {
    let index = Entity._index++;
    const entity = {
        _index: index,
        _id: (+new Date()).toString(16) + (Math.random() * 100000000 | 0).toString(16) + index,
        components: {},
    };
    
    entity.get = function(property) {
        
        /* example: entities[0].get('worldmapY', 'worldmapX') -> returns { worldmapX: 20, worldmapY: 20 } */
        
        if(arguments.length > 1) {
            let _flag_allFound = arguments.length,
                returnObject = {};
            for(let i=0; i<arguments.length;i++) {
                returnObject[arguments[i]] = null;
            }

            for(let component in this.components) {
                if(_flag_allFound == 0) {
                    return returnObject;
                }
                for(let i=0; i<arguments.length; i++) {
                    if(this.components[component].hasOwnProperty(arguments[i])) {
                        returnObject[arguments[i]] = this.components[component][arguments[i]];
                        _flag_allFound = _flag_allFound - 1;
                    } 
                }
            }
            return returnObject;
        }
        
        /* example: entities[0].get('worldmapY') */
        if(typeof property === 'string') {
            for(let component in this.components) {
                if(this.components[component].hasOwnProperty(property)) {
                    return this.components[component][property];
                }
            }
        }
        /* example: entities[0].get(['worldmapY', 'worldmapX']) -> returns [ 20,12] */
        if(property instanceof Array) {
            let _flag_allFound = property.length,
                returnArray = [];
            for(let component in this.components) {
                if(_flag_allFound == 0) {
                    return returnArray;
                }
                for(let i=0; i<property.length; i++) {
                    if(this.components[component].hasOwnProperty(property[i])) {
                        returnArray.push(this.components[component][property[i]]);
                        _flag_allFound = _flag_allFound - 1;
                    } 
                }
            }
            if(_flag_allFound == 0) {
                return returnArray;
            } else { return false; }
        }
    }
    
    entity.set = function(property, value) {
        if(property === '_name') { console.log("Cannot set the component's name!"); return; }
        
        /* example: entity.set( 'worldmapX', 80 ); */
        
        if(typeof property === 'string') {
            for(let component in this.components) {
                if(this.components[component].hasOwnProperty(property)) {
                    this.components[component][property] = value;
                }
            }
        }
        
        /* example: entity.set( ['worldmapX', 'worldmapY'], [80, 666] ); */
        
        if(property instanceof Array) {
            for(let component in this.components) {
                for(let i=0; i<property.length; i++) {
                    if(this.components[component].hasOwnProperty(property[i])) {
                        this.components[component][property[i]] = value[i];
                    }
                }
            }
        }
        
        /* example: entity.set( { worldmapX: 80, worldmapY: 666} ); */
        
        if(typeof property === 'object' && !(property instanceof Array)) {
            for(let component in this.components) {
                for(let prop in property) {
                    if(this.components[component].hasOwnProperty(prop)) {
                       this.components[component][prop] = property[prop]; 
                    }
                }
            }
        }
    };
    
    entity.addComponents = function(components) {
        for(let i=0; i<arguments.length; i++) {
            this.addComponent(arguments[i]);
        }
        return this;
    };
    
    entity.addComponent = function(component) {
        if(typeof component === 'object') {
            this.components[component._name.toLowerCase()] = component;
        }
        if(typeof component === 'function') {
            this.components[component()._name.toLowerCase()] = component();
        }
        return this;
    };
    
    entity.removeComponent = function(component) {
        let _name;
        if(typeof component === 'string'){
            _name = component;
        }
        if(typeof component === 'object'){
            console.log('object');
            _name = component._name;
        }
        if(typeof component === 'function'){
            _name = component()._name.toLowerCase();
        }
        delete this.components[_name.toLowerCase()];
        return this;
    };
    
    entity.print = function() {
        console.log(JSON.stringify(this, null, 4));
        return this;    
    };
    
    Entity.list[index] = entity;
    return entity;
};
Entity._index = 0;
Entity.list = {};
Entity.random = function(min, max) {
    return Math.round(Math.random() * (max-min) + min);
};

module.exports = Entity;

/*
const Entity = function Entity(){
    this.id = (+new Date()).toString(16) + (Math.random() * 100000000 | 0).toString(16) + Entity.prototype._count;
    Entity.prototype._count++;
    
    this.components = {};
    return this;
 };
 
 Entity.prototype._count = 0;
 
 Entity.prototype.addComponent = function addComponent (component ){
    // NOTE: The component must have a name property (which is defined as 
    // a prototype protoype of a component function)
    this.components[component.name] = component;
    return this;
 };
 
 Entity.prototype.removeComponent = function removeComponent ( component ){
    var name = componentName; // assume a string was passed in
    if(typeof componentName === 'function'){ 
        // get the name from the prototype of the passed component function
        name = componentName.prototype.name;
    }
    delete this.components[name];
    return this;
 };
 
 Entity.prototype.print = function print () {
    console.log(JSON.stringify(this, null, 4));
    return this;
 };
 */