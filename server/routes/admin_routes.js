const express     = require('express');
const router      = express.Router();

module.exports = function(io) {
    
    console.log('# admin_routes loaded');
    
    //var app = require('express');
    //var router = app.Router();
    
    router.get('/', function(req,res) {
        res.render('test/game',{
            title: "Game",
            description: "",
            breadcrumb: ["home","game"],
        });  
    });
    
    
    io.on('connection', function(socket) { 
        console.log('someone connected... ' + socket.id); 
    });
    

    return router;
};
