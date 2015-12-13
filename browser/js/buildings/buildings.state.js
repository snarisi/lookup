app.config(function ($stateProvider) {
	$stateProvider.state('allBuildings', {
		url: '/buildings',
		templateUrl: '/templates/buildings.html',
		controller: 'BuildingsCtrl'
	});
	
	$stateProvider.state('buildingsByLoc', {
		url: '/buildings/:loc',
		templateUrl: '/templates/buildings.html',
		controller: 'BuildingsCtrl',
	});
});