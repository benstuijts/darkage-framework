'use strict';

module.exports = function() {
    this.events = {};
    this._name;
    this.on = function(event, obj, callback) {
        if(this.events[event] && typeof this.events[event] === 'function') {
            console.log(`Emitting message "${event}" to Components with object ${obj}`);
            if(typeof obj === 'function') {
                this.events[event](null, obj);
            } else {
                this.events[event](obj, callback);
            }
                
        }
    };
};