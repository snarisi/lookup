app.controller('NewBuildingCtrl', function ($scope) {
	$scope.newBuilding = {
		name: $scope.buildingName,
		location: $scope.location,
		architect: $scope.architect,
		style: $scope.style,
		image: $scope.image,
		description: $scope.description
	}

});