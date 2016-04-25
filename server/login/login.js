'use strict';

const Player = require('../models/Player');

module.exports = function(socket) {
    socket.on('login-player', function(data, cb){
        if(!data) {
          return false;
        }
        if(!data.username || !data.password) {
          cb({success: false, error: "Critical information missing in datapackage"});
          return false;
        }
        if(data.username !== 'demoplayer') {
          cb({success: false, error: "Wrong username"});
          return false;
        }
        if(data.password !== 'demo') {
          cb({success: false, error: "Wrong password"});
          return false;
        }
        if(data.username === 'demoplayer' && data.password === 'demo') {
            
            var player = Player(data.username, "Player", "mongo_id");
            if(player) {
                cb({success: true, message: "Welcome", index:  true});
            } else {
                cb({success: false, error: "Player already logged in"});
            }
        }
    });
}