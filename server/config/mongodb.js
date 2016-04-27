'use strict';
const mongoose      = require("mongoose");
const db = mongoose.connect('mongodb://guest:iamaguest@dharma.mongohq.com:10042/medieval_test2', function(error) {
    if(error) {
        console.log('There was an error connecting to the mongodb: ' + error);
    } else {
        console.log('Mongoose connected');
    }
    
});
module.exports = db;

/* 
Free sandbox at: https://www.compose.io/

user: stuijts@spijkenisse.nl F2013

twee sandboxes:
medieval-test       mongodb://<user>:<password>@dharma.mongohq.com:10007/medieval_test
medieval-test2      mongodb://<user>:<password>@dharma.mongohq.com:10042/medieval_test2     user benstuijts guest iamaguest


*/