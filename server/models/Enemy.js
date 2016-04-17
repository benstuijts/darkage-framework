'use strict';
const Entity = require('./Entity');

const Enemy = function(name, type, id) {
    let index = Enemy._index++;
    const enemy = Entity(name, type, id);
    
    /* Properties */
    enemy._index = index;
    
    /* Method destroy */
    let super_destroy = enemy.destroy;
    enemy.destroy = function() {
        console.log('Destroying Enemy ' + this.name);
        delete Enemy.list[this._index];
        super_destroy();
    };
    
    /* Method copy */
    enemy.copy = function() {
        return Enemy(this.name, this.type, this.id);
    };
    
    /* Method count */
    enemy.count = function() {
        return Object.keys(Enemy.list).length;
    };
    
    Enemy.list[index] = enemy;
    return enemy;
};
Enemy._index = 0;
Enemy.list = {};
Enemy.createMultiple = function(number, name) {
    let enemy = [], index = 0;
    for(var i=0; i<number; i++) {
        enemy.push(Enemy(name + " #" + index++, "Enemy", "id" ));
    }
    return enemy;
};
/* Method count all active enemies*/
Enemy.count = function() {
    return Object.keys(Enemy.list).length;
};
/* Method console.log all active enemies */
Enemy.showListInConsole = function() {
    for(let index in Enemy.list) {
        console.log(`Index ${index} | Name: ${Enemy.list[index].name}`);
    }
};

module.exports = Enemy;