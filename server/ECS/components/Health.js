'use strict';
const Health = function(value) {
    const component = {
        name: 'health',
        hp: value || 20,
        maxHp: value || 20
    };
    return component;
};

module.exports = Health;