var router = require('express').Router();

router.use('/api', require('./api'))

router.get('/', function (req, res, next) {
	res.status(200).send('Home page');
});

module.exports = router;