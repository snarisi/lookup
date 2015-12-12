app.factory('Maps', function ($q) {
	var initalizeMap = function (mapDiv, center, zoom) {
		center = center || { lat: 0, lng: 0 };
		zoom = zoom || 0;
		
		var map = new google.maps.Map(mapDiv, {
			center: center,
			scrollwheel: false,
			zoom: 0
		});
		return map;
	};

	//TODO remove as it is unneeded?
	var centerMap = function (center, map) {
		map.setCenter(center);
	};
	
	var drawMarker = function (position, title, map) {
		var marker = new google.maps.Marker({
			position: position,
			map: map,
			title: title
		});
		return marker;
	}
	
	var findNewBuilding = function (queryName, queryLocation) {
		var map = initalizeMap(mapDiv, { lat: 0, lng: 0 });
		var service = new google.maps.places.PlacesService(map);
		var query = { query: queryName + ' ' + queryLocation };
		
		var deffered = $q.defer();
		var formattedResults;
		
		//search for place via google
		//TODO: query 'The Cooper Union' returns results but 'Cooper Union' does not
		service.textSearch(query, function(results) {
			
			if (!results.length) return deffered.reject(results);
			
			//draw marker and adjust map
			var marker = drawMarker(results[0].geometry.location, results[0].name);
			map.setCenter(marker.position);
			map.setZoom(12);
			
			//return info
			formattedResults = {
				name: results[0].name,
				address: results[0].formatted_address,
				location: [results[0].geometry.location.lng(), results[0].geometry.location.lat()]
			}
			
			deffered.resolve(formattedResults);
				
		});

		//return promise
		return deffered.promise;
	}
	
	var findLocation = function (query, map) {
		//TODO: refactor to combine with the function above
		
		var service = new google.maps.places.PlacesService(map);
		
		var deffered = $q.defer();
		
		//search for place via google
		//TODO: query 'The Cooper Union' returns results but 'Cooper Union' does not
		service.textSearch({ query: query }, function(results) {
			
			if (!results.length) return deffered.reject(results);
			
			var location = [
				results[0].geometry.location.lng(),
				results[0].geometry.location.lat()
			];
			
			deffered.resolve(location);
				
		});

		//return promise
		return deffered.promise;
	}
	
	return {
		initializeMap: initalizeMap,
		findNewBuilding: findNewBuilding,
		findLocation: findLocation
	}
});