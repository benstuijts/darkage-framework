'use strict';
const Entity = require('./Entity');

const Player = function(name, type, id) {
    let index = Player._index++;
    const player = Entity(name, type, id);
    
    /* Properties */
    player._index = index;
    
    /* Method destroy */
    let super_destroy = player.destroy;
    player.destroy = function() {
        console.log('Destroying Player ' + this.name);
        delete Player.list[this._index];
        super_destroy();
    };
    
    /* Method copy */
    player.copy = function() {
        return Player(this.name, this.type, this.id);
    };
    
    /* Method count */
    player.count = function() {
        return Object.keys(Player.list).length;
    };
    
    Player.list[index] = player;
    return player;
};
Player._index = 0;
Player.list = {};

/* Method count all active players */
Player.count = function() {
    return Object.keys(Player.list).length;
};

/* Method console.log all active players */
Player.showListInConsole = function() {
    for(let index in Player.list) {
        console.log(`Index ${index} | Name: ${Player.list[index].name}`);
    }
};
module.exports = Player;