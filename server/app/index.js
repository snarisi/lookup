var express = require('express');
var path = require('path');
var app = express();

var PORT = 3000;

var projectRoot = path.join(__dirname, '../../');

app.use(express.static(path.join(projectRoot, 'browser')));
app.use(express.static(path.join(projectRoot, 'node_models')));
app.use(express.static(path.join(projectRoot, 'public')));

app.use(require('./routes'));

app.listen(PORT, function () {
    console.log('Server listening on port ' + PORT);
});