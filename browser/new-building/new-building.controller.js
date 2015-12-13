app.controller('NewBuildingCtrl', function ($scope, Maps, BuildingUtils) {
	
	var mapDiv = document.getElementById('new-building-map');
	var map = Maps.initializeMap(mapDiv);

	$scope.newBuilding = {};
	$scope.query = {
		name: 'Empire State Building',
		location: 'New York'
	};
	
	$scope.findNewBuilding = function () {
		Maps.findNewBuilding($scope.query.name, $scope.query.location, map)
			.then(res => {
				$scope.searchResults = {
					name: res.name,
					address: res.address
				}
				$scope.newBuilding.location = res.location;
				$scope.newBuilding.address = res.address;
			
				//TODO consider basing the name on the returned results
				$scope.newBuilding.name = $scope.query.name;
			})
			.then(null, function () {
				$scope.searchResults = {
					name: 'No building found'
				}
			})
	}
	
	$scope.addNewBuilding = BuildingUtils.addNewBuilding;
	
});