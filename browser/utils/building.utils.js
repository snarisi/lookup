app.factory('BuildingUtils', function ($http, $state) {

	var addNewBuilding = function (building) {
		return $http.post('/api/buildings', building)
			.then(building => {

				//TODO redirect to building detail page
				$state.go('home');
			})
	}

	var findByLocation = function (location) {
		return $http({
			url: '/api/buildings',
			method: 'GET',
			params: { location: location }
		})
		.then(res => res.data)
		.then(null, console.error.bind(console));
	}

	var findById = function (id) {
		return $http.get('/api/buildings/' + id)
			.then(res => res.data)
			.then(null, console.error.bind(console));
	}

	return {
		addNewBuilding: addNewBuilding,
		findByLocation: findByLocation,
		findById: findById
	}
})
