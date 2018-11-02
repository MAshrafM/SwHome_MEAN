require('dotenv').config()

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const LocalStrategy = require('passport-local');
const passport = require('passport');
const bodyParser = require('body-parser');
const cloudinary = require('cloudinary');

const app = express();

// Mongoose
const mongoose = require('mongoose')
// db connect
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true
})
// use promise with mongoose
mongoose.Promise = global.Promise;
// connection
const db = mongoose.connection;
db.on('connected', () => {
  console.log("Successfully connected to Mongo!")
});
// error connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// set image upload middleware
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Routes
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const homeRouter = require('./routes/home');

app.use('/', indexRouter);
app.use('/api', authRouter);
app.use('/api', homeRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
