var express = require('express');
var {sequelize} = require('./models');

var app = express();
sequelize.sync();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(4000, function () {
  console.log('Example app listening on port 4000!');
});
