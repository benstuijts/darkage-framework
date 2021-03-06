/* ./server/gameserver.js


  To Do list
--------------------------------------------------------
[X]  MongoDB on same server (localhost)
[]  Use React (Flux) with Node JS
[]  Spin up DarkAge droplet
[]  Implement Flightplan
[]  buy https: certificate
[]  Spin up DarkAgedroplet https: certificate

*/

'use strict';

/* Dependencies */

  const express     = require('express');
  const app         = express();
  const http        = require('http').Server(app);
  const io          = require('socket.io')(http);

  const port        = process.env.PORT || 8080;
  const host        = process.env.IP;

  const cookieParser= require('cookie-parser');
  const bodyParser  = require('body-parser');
  const session     = require('express-session');
  const mongoose    = require('mongoose');
  const passport    = require('passport');

/* Configuration */
  const configDb = require('./config/database.js');

/* Database */

const db = require('./config/mongodb');

  // Make our db accessible to our router
  app.use(function(req,res,next){
      req.db = db;
      next();
  });

/* View Engine */
  app.set('views', './views');
  app.set('view engine', 'ejs');

/* Middleware */
  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(session({ secret: 'any string', saveUninitialized: true, resave: true, cookie: { maxAge: 120000 }}));
  app.use(express.static('./public_html'));

http.listen(port,function() {
  console.log(Date.now() + ' | server is running...');
});

/* Socket.io server */
app.get('/', function(req, res){
  res.render('test/game',{
    title: "Game",
    description: "",
    breadcrumb: ["home","game"],
  });  
})

/* Routes */
app.use('/test', require('./routes/test_routes')(io));
app.use('/auth', require('./routes/auth_routes'));
app.use('/game', require('./routes/game_routes')(io));
app.use('/admin', require('./routes/admin_routes')(io));




