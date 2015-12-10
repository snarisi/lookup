app.config(function ($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.when('/new', '/new/search')
	
	$stateProvider.state('newBuilding', {
		url: '/new',
		templateUrl: '/templates/new-building.html',
		controller: 'NewBuildingCtrl'
	});
	
	$stateProvider.state('newBuilding.search', {
		url: '/search',
		templateUrl: '/templates/new-building-search.html'
	});
	
	$stateProvider.state('newBuilding.verify', {
		url: '/verify',
		templateUrl: '/templates/new-building-verify.html'
	});	
	
	$stateProvider.state('newBuilding.info', {
		url: '/info',
		templateUrl: '/templates/new-building-info.html'
	});
});