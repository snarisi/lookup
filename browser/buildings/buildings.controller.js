app.controller('BuildingsCtrl', function ($scope, $stateParams, Maps, BuildingUtils) {
	var mapDiv = document.getElementById('buildings-map');

	$scope.map = Maps.initializeMap(mapDiv);
	$scope.searchLoc = $stateParams.loc;

	Maps.findLocation($stateParams.loc, $scope.map)
		.then(locationArray => {
			$scope.map.setCenter({ lat: locationArray[1], lng: locationArray[0] });
			$scope.map.setZoom(12);
			return BuildingUtils.findByLocation(locationArray.join(','));
		})
		.then(buildings => {
			$scope.buildings = buildings;
			buildings.forEach(function (building) {
				Maps.drawMarker(building, $scope.map);
			});
		})
});
