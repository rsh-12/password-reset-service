const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const listener = require('./service/listener')
const app = express();
const start_connection = require('./util/db/db.connection');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

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
