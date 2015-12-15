var router = require('express').Router();
var Building = require('../../../db').Building;
var Architect = require('../../../db').Architect;
var Style = require('../../../db').Style;
var Promise = require('bluebird');

//get list of buildings with optional location query
router.get('/', function (req, res, next) {
	var coords;

	if (req.query.location) coords = req.query.location.split(',');

	var findBuildings = !coords ? Building.find() : Building.findByLocation(coords);

	findBuildings
		.populate('architect style')
		.exec()
		.then(buildings => res.json(buildings));
});

//route to add building to db
router.post('/', function (req, res, next) {
	var building = req.body;

	var addStyle = Style.findOrCreate({ name: building.style });
	var addArch = Architect.findOrCreate({ name: building.architect });
	var newStyle;
	var newArch;
	var newBuilding;

	//TODO add this logic to the model?
	Promise.all([addStyle, addArch])
		.spread(function (style, arch) {
			console.log('STYLE: ', style);
			console.log('ARCH: ', arch)
			newStyle = style;
			newArch = arch;

			building.style = newStyle._id;
			building.architect = newArch._id;
			console.log('BUILDING: ', building);

			return Building.create(building);
		})
		.then(function (building) {
			console.log('FROM DB: ', building);
			newBuilding = building;

			newStyle.buildings.push(newBuilding._id);
			newArch.buildings.push(newBuilding._id);

			var updateStyle = newStyle.save();
			var updateArch = newArch.save();

			return Promise.all([updateStyle, updateArch]);
		})
		.then(function () {
			res.json(newBuilding);
		})
		.catch(console.error.bind(console));
});

//route to get one building by id
router.get('/:id', function (req, res, next) {
	Building.findById(req.params.id)
		.populate('architect style')
		.exec()
		.then(building => res.json(building));
});

module.exports = router;
