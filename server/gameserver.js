/* ./server/gameserver.js
https://github.com/benstuijts
MAC SUDO F 2014
*/

'use strict';

/* Dependencies */
const http        = require('http');
var express     = require('express');

var app         = express();
var server      = http.createServer(app);

var bodyParser  = require('body-parser');


/* Middleware */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public_html'));

server.listen(3000,function() {
  console.log('server is running...');
});

app.set('view engine', 'ejs');
app.set('views', './public_html/views');

app.use('/test', require('./routes/test_routes'));
//require('./routes/test_routes')(app);

app.get('/', function(req, res){
  res.send('<h1>Hello App!</h1>');
});
