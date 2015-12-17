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
    };
});
