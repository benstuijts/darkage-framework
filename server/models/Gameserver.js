'use strict';
const Gametime = require('./Gametime');
const colors = require('colors');

/*  Hoe checken we in het geval van een server error of reboot 
    of een gameserver reeds gestart is en dus uit de database
    gehaald dient te worden?
*/

const Gameserver = function(options) {
    let index = Gameserver._index++;
    const gameserver = {
        index: index,
        status: true,
        muted: false,
        maxNumberOfPlayers: 100,
        startDate: null,
        turn: 1,
        maxNumberOfTurns: 100,
        timeBetweenRoundsInHours: 2,
        round: 0,
        gametime: Gametime(10,7200),
        meta: {
            name: "",
            description: "",
        },
        startup: {
            resources: {
                goud: 10,
                hout: 100,
                steen: 25,
                ijzer: 10,
                brood: 100,
                vlees: 40,
                vis: 25
            }
        },
        players: {},
        worldmap: null
    };
  
    for(var prop in options) {
        gameserver[prop] = options[prop];
    }

    /* Player controls */
    gameserver.registerPlayer = function(player, cb) {
        if(gameserver.status === false) {
            return cb(true, "Server turned OFF");
        }
        if(Object.keys(gameserver.players).length >= gameserver.maxNumberOfPlayers ) {
            return cb(true, "This server is full, try an other.");
        } else {
            
            if(gameserver.players[player._id]) {
                return cb(true, "This player already registered to this server");
            }
            
            gameserver.players[player._id] = player._id;
            return cb(false, null); 
        }
    };
    
    gameserver.removePlayer = function(player, cb) {
        delete gameserver.players[player._id];
    };
    
    gameserver.authenticatePlayer = function(player, cb) {
        if(gameserver.status === false) {
            return cb(true, "Server turned OFF");
        }
        if(gameserver.muted === true) {
            return cb(true, "Server is calculating the next turn, try again in one moment...");
        }
        if(gameserver.players[player._id]) {
            cb(false, null);
        } else {
            cb(true, "This player is not registered to this server");
        }    
    };

    /* Server timer controls */
    gameserver.timer = null;
    
    gameserver.listener = function() {
        return function() {
            gameserver.nextTurn();
        };  
    };
    
    gameserver.initializeListener = function() {
        clearInterval(gameserver.timer);
        //console.log(` initializing listener next turn #${gameserver.index}, each turn will take ${gameserver.gametime.tur} minutes.`.inverse);
        gameserver.timer = setInterval(function(){
            clearInterval(gameserver.timer);
            gameserver.nextTurn();
        }, gameserver.gametime.turn * 60 * 1000);
    };
    
    gameserver.setGametime = function(durationOfOneTurnInMinutes, durationOfOneTurnInGametimeInMinutes) {
        gameserver.gametime.set(durationOfOneTurnInMinutes, durationOfOneTurnInGametimeInMinutes);
        gameserver.initializeListener();
        return this;
    };
    
    gameserver.nextTurn = function() {
        console.log(` Server # ${gameserver.index} "${gameserver.meta.name}" calculating next turn...`.inverse);
        gameserver.mute();
        gameserver.incrementTurn();
        // let op simulatie van calculatie van 2 seconde!
        setTimeout(function() { 
            gameserver.unmute(); 
            gameserver.initializeListener();
        }, 2000);
    };
    
    gameserver.incrementTurn = function() {
        gameserver.turn++;
        if(gameserver.turn >= gameserver.maxNumberOfTurns) {
            gameserver.initializeNextRound();
        }
    };
    
    gameserver.initializeNextRound = function() {
        
        gameserver.turn = 1;
        console.log('Server is initializing for the next round.'.red);
        setTimeout(function() {
            gameserver.initializeListener();
        }, gameserver.timeBetweenRoundsInHours * 60 * 60 * 1000);
    };
    
    /* Server housekeeping controls */
    
    // Select all players where lastlogin >= XXX and vacationMode === false -> players Array
    gameserver.deleteInactivePlayers = function(players) {
        players.forEach(function(player){
            console.log(player._id);
            if(gameserver.players[player._id]) {
                gameserver.removePlayer(player);
            }
        });
    }
    
    /* Server status controls */
    
    gameserver.mute = function() {
        gameserver.muted = true;
        //console.log(` Server # ${gameserver.index} "${gameserver.meta.name}" MUTED.`.red.inverse);
        return this;
    };

    gameserver.unmute = function() {
        gameserver.muted = true;
        //console.log(` Server # ${gameserver.index} "${gameserver.meta.name}" UNMUTED.`.green.inverse);
        return this;
    };
    
    gameserver.on = function() {
        gameserver.status = true;
        console.log(` Server # ${gameserver.index} "${gameserver.meta.name}" turned ON.`.green.inverse);
        return this;
    };
    
    gameserver.off = function() {
        gameserver.status = false;
        
        console.log(` Server # ${gameserver.index} "${gameserver.meta.name}" turned OFF.`.red.inverse);
        return this;
    };
   
    gameserver.load = function() {
                // reload gameserver when server crashes
    };
  
    gameserver.copy = function(options) {
        let serverCopy = Gameserver(this);
  
        for(var prop in options) {
            serverCopy[prop] = options[prop];
        }
        return serverCopy;
    };
  
  
    gameserver.destroy = function() {
        delete Gameserver.list[gameserver.index];
    };
  
    gameserver.list = function() {
        console.log(Gameserver.list);
    };
  
    gameserver.initializeListener();
  
  Gameserver.list[index] = gameserver;
  return gameserver;
}
Gameserver._index = 0;
Gameserver.list = {}

Gameserver.count = function() {
    return Object.keys(Gameserver.list).length;
};
Gameserver.activeServers = function() {
    for( let index in Gameserver.list) {
        if(Gameserver.list[index].status) {
            console.log(Gameserver.list[index].meta.name);
        }
  }
};

module.exports = Gameserver;
