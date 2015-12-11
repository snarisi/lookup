app.controller('NewBuildingCtrl', function ($scope, Maps, $document) {
	$scope.newBuilding = {
		name: $scope.buildingName,
		location: $scope.location,
		architect: $scope.architect,
		style: $scope.style,
		image: $scope.image,
		description: $scope.description
	}
	
	console.log('$SCOPE: ', $scope);
	
	Maps.findNewBuilding('empire state building', 'new york', $scope.map)
		.then(res => console.log(res));
	
});