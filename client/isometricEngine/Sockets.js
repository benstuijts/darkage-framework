'use strict';
const Component = require('./Component');









const Sockets = function(socket) {
    
    const component = new Component();

    component._name = "socket";
    
    
    component.events = {
        
        "io_loadMap" : function(map) {
            socket.emit("loadMap", map, function(map){
                component.emit("gotNewMap", {map: map});
            });
        }.bind(component)
        
    };
    
    
    
    return component;
}

module.exports = Sockets;
