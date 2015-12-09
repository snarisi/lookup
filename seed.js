var Building = require('./server/db').Building;
var Architect = require('./server/db').Architect;
var Style = require('./server/db').Style;
var Promise = require('bluebird');

var buildings = [
	{
		name: 'Empire State Building',
		architect: 'William Lamb',
		style: 'Art Deco',
		location: [-73.98566440000002, 40.7484405]
	},
	{
		name: 'Flatiron Building',
		architect: 'Daniel Burnham',
		style: 'Beaux-Arts',
		location: [-73.9896986, 40.7410605]
	},
	{
		name: 'UN Building',
		architect: 'Le Corbusier',
		style: 'International Style',
		location: [-73.96800910000002, 40.7488758]
	},
	{
		name: 'New York by Gehry',
		architect: 'Frank Gehry',
		style: 'Contemporary',
		location: [-74.00561519999997, 40.7108851]
	},
	{
		name: 'Chrysler Building',
		architect: 'William Van Allen',
		style: 'Art Deco',
		location: [-73.975502, 40.7516208]
	},
	
]

Promise.all([Building.remove({}), Architect.remove({}), Style.remove({})])
	.then(function () {
	
		var addAll = buildings.map(function (building) {
			  var newArch;
			  var newStyle;
			
			  //TODO refactor with Promise.all
			  return Architect.findOrCreate({ name: building.architect })
			  .then(function(architect) {
				newArch = architect;
				building.architect = architect._id;
				return Style.findOrCreate({ name: building.style });
			  })
			  .then(function(style) {
				newStyle = style;
				building.style = style._id;
			  })
			  .then(function() {
				return Building.create(building);
			  })
			  .then(function(doc) {
				newArch.buildings.push(doc._id);
				newArch.save();
				newStyle.buildings.push(doc._id);
				newStyle.save();
			  })
			  .then(null, function(err) {
				console.error(err);
			  });  
		});
		return Promise.all(addAll);
	})
	.then(function () {
		console.log('Database seeded');
		process.exit(0);
	});