var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')
var bodyParser = require("body-parser");
var flash = require("req-flash");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var sessionRouter = require('./routes/session')

// lokasi untuk auth
const loginRoutes = require('./routes/login')
const registerRoutes = require('./routes/register')

//panggil routes kelas
var kelasRouter = require('./routes/kelas')
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'iniadalahrahasiamu',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 60 * 60 * 1000 }
}))
app.use(flash())

app.use(function (req, res, next) {
    res.setHeader(
      "Cache-Control",
      "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
    );
    res.setHeader("Pragma", "no-cache");
    next();
  });

app.set('views', path.join(__dirname,'./views'))
app.set('view engine', 'ejs')

app.use('/', indexRouter);
app.use('/users', usersRouter);
//kelasRouter
app.use('/kelas', kelasRouter)
app.use('/session', sessionRouter)

app.use("/login", loginRoutes);
app.use("/register", registerRoutes);

module.exports = app;
