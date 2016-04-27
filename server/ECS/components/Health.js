'use strict';
const Health = function(value) {
    const component = {
        _name: 'health',
        hp: value || 20,
        maxHp: value || 20
    };
    return component;
};

module.exports = Health;