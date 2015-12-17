var app = angular.module('lookUp', ['ui.router']);

app.config(function ($urlRouterProvider, $locationProvider) {	
	$urlRouterProvider.otherwise('/');
});
app.directive('luMapBuildings', function (Maps, BuildingUtils, $stateParams) {
    return {
        restrict: 'E',
        scope: {
            buildings: '=',
            map: '='
        },
        link: function (scope, element, attrs) {

        }
    }
})

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

app.factory('Buildings', function (BuildingUtils) {
	
});
app.config(function ($stateProvider) {
	$stateProvider.state('allBuildings', {
		url: '/buildings',
		templateUrl: '/templates/buildings.html',
		controller: 'BuildingsCtrl'
	});

	$stateProvider.state('buildingsByLoc', {
		url: '/buildings/location/:loc',
		templateUrl: '/buildings/buildings.html',
		controller: 'BuildingsCtrl',
	});
});

app.filter('architectAndStyle', function () {
    return function (items, filters) {
        if (!items) return;
        if (Object.keys(filters).length === 0) return items;

        var filteredBuildings = [];

        items.forEach(function (item) {
            if (filters[item.architect._id] || filters[item.style._id]) {
                filteredBuildings.push(item);
            }
        });

        return filteredBuildings;
    }
})

app.filter('unique', function () {

    return function (items) {
        var filteredItems = [];
        var itemsSeen = {};

        items.forEach(function (item) {
            if (!itemsSeen[item._id]) {
                itemsSeen[item._id] = true;
                filteredItems.push(item);
            }
        });
        return filteredItems;
    }
});

app.controller('HomeCtrl', function () {
	
});
app.config(function ($stateProvider, $urlRouterProvider) {
	$stateProvider.state('home', {
		url: '/',
		templateUrl: '/home/home.template.html',
		controller: 'HomeCtrl'
	});
})
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
			.then(function (res) {
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


app.config(function ($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.when('/new', '/new/search')
	
	$stateProvider.state('newBuilding', {
		url: '/new',
		templateUrl: '/new-building/new-building.html',
		controller: 'NewBuildingCtrl'
	});
	
	$stateProvider.state('newBuilding.search', {
		url: '/search',
		templateUrl: '/new-building/new-building-search.html'
	});
	
	$stateProvider.state('newBuilding.verify', {
		url: '/verify',
		templateUrl: '/new-building/new-building-verify.html'
	});	
	
	$stateProvider.state('newBuilding.info', {
		url: '/info',
		templateUrl: '/new-building/new-building-info.html'
	});
});
app.directive('luMapSingle', function (Maps) {
    return {
        restrict: 'E',
        scope: {
            buildings: '='
        },
        link: function (scope, element, attrs) {
            var mapDiv = element[0];
            var map = Maps.initializeMap(mapDiv);
            var markers = [];

            scope.buildings.forEach(function (building) {
                markers.push(Maps.drawMarker(building, map));
            });

            if (scope.buildings.length === 1) {
                map.setCenter(markers[0].position);
                map.setZoom(16);
            } else {

            }

            /*
            pass buildings and search location into the scope
            if there is no search location, draw the marker and center on the marker position
            if there is a search location, center on the search location and draw markers

            put the location search inside of initializeMap
            */
        }
    }
});

app.controller('SingleBuildingCtrl', function ($scope, $stateParams, building) {
    $scope.building = building;
});

app.config(function ($stateProvider) {
    $stateProvider.state('singleBuilding', {
        url: '/buildings/:id',
        templateUrl: '/single-building/single-building.html',
        controller: 'SingleBuildingCtrl',
        resolve: {
            building: function (BuildingUtils, $stateParams) {
                return BuildingUtils.findById($stateParams.id);
            }
        }
    })
})

app.factory('BuildingUtils', function ($http, $state) {

	var addNewBuilding = function (building) {
		return $http.post('/api/buildings', building)
			.then(function (building) {

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
		.then(function (res) {
			return res.data;
		})
		.then(null, console.error.bind(console));
	}

	var findById = function (id) {
		return $http.get('/api/buildings/' + id)
			.then(function (res) {
				return res.data;
			})
			.then(null, console.error.bind(console));
	}

	return {
		addNewBuilding: addNewBuilding,
		findByLocation: findByLocation,
		findById: findById
	}
})

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

	var drawMarker = function (building, map) {
		var marker = new google.maps.Marker({
			position: { lat: building.location[1], lng: building.location[0]} ,
			map: map,
			title: building.name
		});

		var infowindow = new google.maps.InfoWindow({

					 //TODO figure out how to do this with a directive
          	content: '<p>' + building.name + '</p>' +
					 '<p>' + building.architect.name + '</p>' +
                  	 '<p>' + building.style.name + '</p>' +

					 //TODO figure out how to do this with ui-sref
                  	 '<a href="/#/buildings/' + building._id + '">More</a> ' +
                  	 '<a href="/#/buildings/' + building._id + '/edit">Edit</a>'
        });

        marker.addListener('click', function () {
			infowindow.open(map, marker);
        });

		return marker;
	}

	var findNewBuilding = function (queryName, queryLocation, map) {

		var service = new google.maps.places.PlacesService(map);
		var query = { query: queryName + ' ' + queryLocation };

		var deffered = $q.defer();
		var formattedResults;

		//search for place via google
		service.textSearch(query, function(results) {

			if (!results.length) return deffered.reject(results);

			//draw marker and adjust map
			var marker = new google.maps.Marker({
				position: results[0].geometry.location,
				map: map,
				title: results[0].name
			});

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
		centerMap: centerMap,
		findNewBuilding: findNewBuilding,
		findLocation: findLocation,
		drawMarker: drawMarker
	}
});

app.directive('luFilter', function ($timeout) {
    return {
        restrict: 'E',
        templateUrl: '/buildings/filter/filter.html',
        scope: {
            options: '=',
            filters: '=',
            activate: '='
        },
        link: function (scope, element, attrs) {
            var $searchBar = element.find('input');
            var $list = element.find('ul');
            var $listItem = $list.find('li');

            $list.addClass('hidden');

            $searchBar.on('focus', function () {
                $list.removeClass('hidden');
            });

            $searchBar.on('blur', function () {
                $timeout(function () {
                    $list.addClass('hidden');
                }, 200)
            });
        }
    }
})

app.directive('buildingItem', function () {
    return {
        restrict: 'E',
        templateUrl: 'buildings/item/building.item.html',
        constroller: 'BuildingsCtrl',
        scope: {
            building: '=',
        }
    }
})
