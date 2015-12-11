app.directive('map', function (Maps) {
	return {
		restrict: 'A',
//		scope: {
//			map: '='
//		},
		link: function (scope, element, attrs) {
			scope.map = Maps.initializeMap(element[0], {lat: 0, lng: 0});
			console.log(scope.map);
		}
	}
})