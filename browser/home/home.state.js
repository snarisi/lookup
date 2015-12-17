app.config(function ($stateProvider, $urlRouterProvider) {
	$stateProvider.state('home', {
		url: '/',
		templateUrl: '/home/home.template.html',
		controller: 'HomeCtrl'
	});
});
