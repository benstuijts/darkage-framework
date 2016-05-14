'use strict';

const Component = require('./Component');

const Character = function(name) {
    
    const component = new Component();

    component._name = "character";
    component.name = name || "Character";
    
    component.events = {
        'changeCharacterName' : function(name) {
            this.name = name;    
        }.bind(this),
        
        
        'update' : function(obj,callback) {
            console.log('updating component of ' + component._name);
            console.log('emiting now to other components the message "moveTo"...');
            console.log('ACTIVE = ' + component.checkIfActive());
            component.emit('moveTo', {worldmapX: 99, worldmapY: 99, speed: 41});
            
        }.bind(this),
        
    }
    
    return component;
}

/*
const Character = function(value) {
    const component = {
        _name: 'character',
        name: value || "Character", 
    };
    
    component.events = {};
      
    component.on = function(event) {
        if(component.events[event] && typeof component.events[event] === 'function') {
            component.events[event]();
        }
    };
    return component;
};
*/
module.exports = Character;