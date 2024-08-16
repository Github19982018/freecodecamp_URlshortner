require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyparser = require('body-parser');
const { doesNotMatch } = require('assert');
const dns = require('dns');
const { error } = require('console');

// Basic Configuration
const port = process.env.PORT || 3000;
storeCount = 0
storeData = {

}

app.use(cors());
app.use(bodyparser.urlencoded({'extended':false}))

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.post('/api/shorturl',function(req,res){
  try {
    var url = new URL(req.body.url)
    if(url.protocol !== 'http:' && url.protocol!=='https:'){
      throw 'invalid url'
    }
      storeCount += 1
      storeData[storeCount] = url
      let sUrl = {'original_url':url, 'short_url':storeCount}
      res.json(sUrl) 
  } catch (error) {
    res.json({ error: 'invalid url' })
  }
  
})
app.get('/api/shorturl/:id',function(req,res){
  res.redirect(storeData[req.params.id])
})
app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
