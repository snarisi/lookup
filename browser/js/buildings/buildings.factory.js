app.factory('Buildings', function ($http, $state) {
	
	var addNewBuilding = function (building) {
		return $http.post('/api/buildings', building)
			.then(building => {
			
				//TODO redirect to building detail page
				$state.go('buildings');
			})
	}
	
	return {
		addNewBuilding: addNewBuilding
	}
})