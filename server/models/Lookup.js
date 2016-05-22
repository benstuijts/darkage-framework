'use strict';

/* 
    usage:
    .add([jsonobject]);
    .remove([json key])
    
    const Lookup    = require("./Lookup.js").add(tiles).add({"somevalue": "hello"});
    
    Lookup.get("water.meta.name");  //water
    Lookup.get("somevalue"); // hello
    Lookap.remove("somevalue");
    
*/

module.exports = {
    books: {},
    subscribe: function() {
        this.add.apply(this,arguments); 
        return this;
    },
    add: function() {
        for(let i=0; i<arguments.length;i++) {
            if(typeof arguments[i] === 'object') {
                for(let prop in arguments[i]) {
                    this.books[prop] = arguments[i][prop];
                }
            }
            if(typeof arguments[i] === 'string') {
                this.books[arguments[i]] = arguments[i + 1];
                continue;
            }
        }
        return this;
    },
    unsubscribe: function(name) {
        if(this.books[name]) delete this.books[name];
        return this;
    },
    remove: function(name) { this.unsubscribe(name); return this;},
    get: function(name) {
        return ref(this.books, name);
    },
    getAll: function() {
        return this.books;
    }
    
};

function ref(obj, str) {
    return str.split(".").reduce(function(o, x) { 
        if(o[x]) {
            return o[x]; 
        } else {
            return false;
        }
    }, obj);
}

