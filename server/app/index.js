var express = require('express');
var app = express();

var PORT = 3000;

app.use(require('./routes'));

app.listen(PORT, function () {
    console.log('Server listening on port ' + PORT);
});