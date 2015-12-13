app.controller('BuildingsCtrl', function ($scope, $stateParams, Maps, BuildingUtils) {
	var mapDiv = document.getElementById('buildings-map');
	var map = Maps.initializeMap(mapDiv);
	
	Maps.findLocation($stateParams.loc, map)
		.then(locationArray => {
			map.setCenter({ lat: locationArray[1], lng: locationArray[0] });
			map.setZoom(12);
			return BuildingUtils.findByLocation(locationArray.join(','));
		})
		.then(buildings => {
			$scope.buildings = buildings;
			buildings.forEach(function (building) {
				Maps.drawMarker(building, map);
			});
		})
});