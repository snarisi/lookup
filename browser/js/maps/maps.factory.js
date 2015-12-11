app.factory('Maps', function ($q) {
	
	var initalizeMap = function (mapDiv, center) {
		var map = new google.maps.Map(mapDiv, {
			center: center,
			scrollwheel: false,
			zoom: 0
		});
		return map;
	};
	
	var centerMap = function (map, center) {
		map.setCenter(center);
	};
	
	var drawMarker = function (mapElement, position, title) {
		var marker = new google.maps.Marker({
			position: position,
			map: mapElement,
			title: title
		});
		return marker;
	}
	
	var findNewBuilding = function (queryName, queryLocation, map) {
		console.log(map);
		var service = new google.maps.places.PlacesService(map);
		var query = queryName + ',' + queryLocation;
		var deffered = $q.defer();

		service.textSearch(query, function(results) {
			console.log(results);
			if (results) deffered.resolve(results);
			else deffered.reject(results);
		});

		return deffered.promise;
	}
	
	return {
		initializeMap: initalizeMap,
		findNewBuilding: findNewBuilding
	}
});