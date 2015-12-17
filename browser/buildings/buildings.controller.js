app.controller('BuildingsCtrl', function ($scope, $stateParams, Maps, BuildingUtils) {
	var mapDiv = document.getElementById('buildings-map');

	$scope.map = Maps.initializeMap(mapDiv);
	$scope.searchLoc = $stateParams.loc;
	$scope.styles = [];
	$scope.architects = [];
	$scope.activeFilters = {};

	Maps.findLocation($stateParams.loc, $scope.map)
		.then(function (locationArray) {
			$scope.map.setCenter({ lat: locationArray[1], lng: locationArray[0] });
			$scope.map.setZoom(12);
			return BuildingUtils.findByLocation(locationArray.join(','));
		})
		.then(function (buildings) {
			$scope.buildings = buildings;
			buildings.forEach(function (building) {
				Maps.drawMarker(building, $scope.map);
				$scope.styles.push(building.style);
				$scope.architects.push(building.architect);
			});
		});

	$scope.activateFilter = function (option) {
		$scope.activeFilters[option._id] = option.name;
	}

	$scope.deactivateFilter = function (name) {
		Object.keys($scope.activeFilters).forEach(function (id) {
			if ($scope.activeFilters[id] === name) delete $scope.activeFilters[id];
		});
	}
});
