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
	var newBuiding;
	
	//TODO add this logic to the model?
	Promise.all([addStyle, addArch])
		.spread(function (style, arch) {
			newStyle = style;
			newArch = arch;
		
			building.style = newStyle._id;
			building.architect = newArch._id;
			
			return Building.create(building);
		})
		.then(function (newBuilding) {
			newBuilding = newBuilding;
		
			newStyle.buildings.push(newBuilding._id);
			newArch.buildings.push(newBuilding._id);
			
			var updateStyle = (newStyle.save());
			var updateArch = (newArch.save());
			
			return Promise.all([updateStyle, updateArch]);
		})
		.then(function () {
			res.json(newBuiding);
		})
		.catch(console.error.bind(console));
});

//route to get one building by id
router.get('/:id', function (req, res, next) {
	Building.findById(req.params.id)
		.then(building => res.json(building));
});

module.exports = router;