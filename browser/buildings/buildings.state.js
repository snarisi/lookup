app.config(function ($stateProvider) {
	$stateProvider.state('allBuildings', {
		url: '/buildings',
		templateUrl: '/templates/buildings.html',
		controller: 'BuildingsCtrl'
	});

	$stateProvider.state('buildingsByLoc', {
		url: '/buildings/location/:loc',
		templateUrl: '/buildings/buildings.html',
		controller: 'BuildingsCtrl',
		// resolve: {
		// 	searchLocation: function (Maps, $stateParams) {
		// 		// return Maps.findLocation($stateParams.loc, document.createElement('div'));
		// 	}
		// }
	});
});
