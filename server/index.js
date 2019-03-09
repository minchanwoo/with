var express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var { sequelize } = require('./models');

var app = express();

const session = require('express-session');

var userRouter = require('./routes/user');
var postRouter = require('./routes/post');

sequelize.sync();

app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000'
}));
app.use(bodyParser());

app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  })
);

app.use('/users', userRouter);
app.use('/posts', postRouter);

app.listen(4000, function () {
  console.log('Example app listening on port 4000!');
});
