var express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var { sequelize } = require('./models');

var app = express();

var userRouter = require('./routes/user');
sequelize.sync();

app.use(cors());
app.use(bodyParser());

app.use('/users', userRouter);

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(4000, function () {
  console.log('Example app listening on port 4000!');
});
