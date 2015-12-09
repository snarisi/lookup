var express = require('express');
var path = require('path');
var app = express();

var PORT = 3000;

app.use(express.static(path.join(__dirname, '../../browser')));

app.use(require('./routes'));

app.listen(PORT, function () {
    console.log('Server listening on port ' + PORT);
});