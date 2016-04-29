'use strict';
const lib = {

    enemy : {
        struikrover: {
            hp: 10,
            speed: 1,
            attack: 2,
            armor: 1
        },
        ridder: {
            hp: 12,
            speed: 2,
            attach: 4,
            armor: 3
        }
    }
    
};

// SYNTAX: [collection][model]

module.exports.get = function(query) {
    let _get = function(obj, prop) {
        return obj[prop];
    };
    console.log(typeof query);
    
    if(typeof query === 'string') {
        let str = query.split('.');

        let search = lib;
        for(var i=0; i<str.length; i++) {
            search = _get(search, str[i]);
        }
        return search;
    }
};
module.exports.set = function(query, to) {
    let q = query.split(".");
    let prop = q.splice(q.length-1,1);
        q = q.join(".");
    let property = this.get(q);
    property[prop] = to;
};
module.exports.delete = function(query) {
    
};

module.exports.add = function(collection, object) {
    
}





