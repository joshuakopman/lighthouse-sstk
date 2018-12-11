var express = require('express');
var Runner = require('./Runner');
var exphbs  = require('express-handlebars');
const runner = new Runner();
const SocketServer = require('ws').Server;
const PORT = process.env.PORT || 3000;
const server = express()
  .engine('handlebars', exphbs({defaultLayout: 'main'}))
  .set('view engine', 'handlebars')
  .use('/logs', express.static('logs'))
  .use('/assets', express.static('assets'))
  .use('/',(req, res) => res.render('index',
  	{
  "pageTypes": [
    {
      "name": "lohp",
      "title": "Logged Out Homepage"
    },
    {
      "name": "adp",
      "title": "Asset Detail Page"
    },
    {
      "name": "cmsStudioExplore",
      "title": "Studio Contentful Explore Page"
    },
     {
      "name": "cmsStudioLOHP",
      "title": "Studio Contentful LOHP Page"
    },
    {
      "name": "search",
      "title": "Search Results Page"
    }
  ]
}
)
).listen(PORT, () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server })
  .on('error', function(e){ 
    console.log('server socket error: '+e);
  })
 .on('close', function(e){ 
    console.log('server socket closed: ' +e);
  });

runner.startAudit(wss);
