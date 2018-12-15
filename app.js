var express = require('express');
var Runner = require('./Runner');
var exphbs  = require('express-handlebars');
var pageTypes = require('./pageTypes');


const runner = new Runner();
const SocketServer = require('ws').Server;
const PORT = process.env.PORT || 3000;
const server = express()
  .engine('handlebars', exphbs({defaultLayout: 'main'}))
  .set('view engine', 'handlebars')
  .use('/logs', express.static('logs'))
  .use('/assets', express.static('assets'))
  .use('/types',(req, res) => res.json({ "pageTypes" : pageTypes }))
  .use('/',(req, res) => res.render('index',{ "pageTypes" : pageTypes }))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server })
  .on('error', function(e){ 
    console.log('server socket error: '+e);
  })
 .on('close', function(e){ 
    console.log('server socket closed: ' +e);
  });

runner.startAudit(wss);
