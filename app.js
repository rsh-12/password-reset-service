const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const listener = require('./service/listener')
const indexRouter = require('./routes/index');
const app = express();
const start_connection = require('./util/db/db.connection');

// const cookieParser = require('cookie-parser');
// app.use(cookieParser());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
});

listener();
start_connection().catch(reason => console.log(reason));

module.exports = app;
