var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

var messages = require('./routes/v1/messages');

var app = express();

console.log("Running " + app.get('env'));
console.log(">>>>>>>>");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));

app.use('/authenticate', auth);
app.use('/api/v1/messages', messages);

// error handlers


// production error handler
// no stacktraces leaked to user
if (app.get('env') === 'production') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
    });

}else{
    app.use(function(err, req, res, next) {
        console.log('Development Side Error:');
        console.log(err);
        res.status(err.status || 500);
        res.json({error:err});
    });

}

module.exports = app;
