'use strict';
const Character = function(value) {
    const component = {
        _name: 'character',
        name: value || "Character", 
    };
    return component;
};

module.exports = Character;