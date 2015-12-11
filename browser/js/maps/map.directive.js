app.directive('map', function (Maps) {
	return {
		restrict: 'A',
		scope: {
			map: '='
		},
		link: function (scope, element, attrs) {
			Maps.initializeMap(element[0], {lat: 0, lng: 0});
		}
	}
})