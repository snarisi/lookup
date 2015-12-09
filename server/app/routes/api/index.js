var router = require('express').Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extended:false}));
router.use(bodyParser.json());

router.use('/buildings', require('./buildings'));

module.exports = router;