var app = require('express')();
var cors = require('cors')
var express = require('express');
var path = require('path');
var http = require('http').createServer(app);

app.use(express.static(path.join(__dirname, 'public')));


const Port = process.env.PORT || 3001;
http.listen(Port, function(){
  console.log(`listening on :${Port}`);
});