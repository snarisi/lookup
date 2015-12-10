app.config(function ($stateProvider) {
	$stateProvider.state('buildings', {
		url: '/buildings',
		templateUrl: '/templates/buildings.html',
		controller: 'BuildingsCtrl'
	});
});