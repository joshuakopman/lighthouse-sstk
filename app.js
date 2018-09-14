var express = require('express');
var Runner = require('./Runner');
const runner = new Runner();
const SocketServer = require('ws').Server;
const PORT = process.env.PORT || 3000;
const server = express()
  .use('/logs', express.static('logs'))
  .use('/assets', express.static('assets'))
  .use('/',(req, res) => res.sendFile('index.html', { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));
const wss = new SocketServer({ server })
  .on('error', function(e){ 
    console.log('server socket error: '+e);
  })
 .on('close', function(e){ 
    console.log('server socket closed: ' +e);
  });

runner.startAudit(wss);
