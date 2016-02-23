/* ./server/gameserver.js


  To Do list
--------------------------------------------------------
[X]  MongoDB on same server (localhost)
[]  Spin up DarkAge droplet
[]  Implement Flightplan
[]  buy https: certificate
[]  Spin up DarkAgedroplet https: certificate

*/

'use strict';

/* Dependencies */
  const http        = require('http');
  const express     = require('express');
  const app         = express();
  const server      = http.createServer(app);

  const cookieParser= require('cookie-parser');
  const bodyParser  = require('body-parser');
  const session     = require('express-session');
  const mongoose    = require('mongoose');
  const passport    = require('passport');

/* Configuration */
  const configDb = require('./config/database.js');

/* Database */
  mongoose.connect(configDb.localhost.url, function(err){
      if(err) {console.log('! NOT Connected to database');}
      console.log('# Connected to database: ' + configDb.localhost.name);
  });
  // Make our db accessible to our router
  app.use(function(req,res,next){
      req.db = 'database instance';
      next();
  });

/* Middleware */
  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(session({ secret: 'any string', saveUninitialized: true, resave: true, cookie: { maxAge: 120000 }}));
  app.use(express.static(__dirname + '/public_html'));

server.listen(3000,function() {
  console.log('server is running...');
});

/* View Engine */
app.set('view engine', 'ejs');
app.set('views', './public_html/views');

/* Routes */
app.use('/test', require('./routes/test_routes'));
require('./routes/game_routes')(app);
require('./routes/admin_routes')(app);
