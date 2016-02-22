/* ./server/gameserver.js
https://github.com/benstuijts
MAC SUDO F 2014
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
  var configDb = require('./config/database.js');

/* Database */
  mongoose.connect(configDb.url, function(){
      console.log('# Connected to database.');
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
