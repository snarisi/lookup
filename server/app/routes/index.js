var router = require('express').Router();
var path = require('path');

router.use('/api', require('./api'))

router.get('/', function (req, res, next) {
	res.status(200).sendFile(router.get(path.join(__dirname, '../../browser/index.html')));
});

module.exports = router;