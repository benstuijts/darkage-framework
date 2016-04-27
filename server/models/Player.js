'use strict';
const jsonfile    = require('jsonfile');
const colors = require('colors');

const Entity    = require('./Entity');

// Let op op Playerobject moet unique zijn!

const Player = function(name, type, id) {
    
    const player = Entity(name, type, id);
    if(player.validator(Player.list, "name", name) === false) return false;
    
    
    
    let index = Player._index++;
    
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
    
    /* Method writeToJSONFile */
    player.writeToJSONFile = function(location) {
        if(!location || location == '') { 
            console.log(' ERROR: Specify location and filename: ./var_dump/player.json '.inverse.red);  return false;
        }
        jsonfile.writeFile(location, this, {spaces: 2}, function (error) {
            if(error) { 
                console.log('Specify location and filename: ./var_dump/player.json | '.red + error.inverse);
            } else {
                console.log(' json object was written to '.inverse.green + location.inverse);
            }
        });
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