app.config(function ($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.when('/new', '/new/search')
	
	$stateProvider.state('newBuilding', {
		url: '/new',
		templateUrl: '/new-building/new-building.html',
		controller: 'NewBuildingCtrl'
	});
	
	$stateProvider.state('newBuilding.search', {
		url: '/search',
		templateUrl: '/new-building/new-building-search.html'
	});
	
	$stateProvider.state('newBuilding.verify', {
		url: '/verify',
		templateUrl: '/new-building/new-building-verify.html'
	});	
	
	$stateProvider.state('newBuilding.info', {
		url: '/info',
		templateUrl: '/new-building/new-building-info.html'
	});
});