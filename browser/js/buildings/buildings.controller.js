app.controller('BuildingsCtrl', function ($scope, $stateParams, Maps) {
	console.log('in buildings controller');
	Maps.centerOnLocation($stateParams.loc);
});