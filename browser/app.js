var app = angular.module('lookUp', ['ui.router']);

app.config(function ($urlRouterProvider, $locationProvider) {	
	$urlRouterProvider.otherwise('/');
});