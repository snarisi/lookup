app.directive('luMapSingle', function (Maps) {
    return {
        restrict: 'E',
        scope: {
            building: '='
        },
        link: function (scope, element, attrs) {
            var mapDiv = element[0];
            var map = Maps.initializeMap(mapDiv);

            var marker = Maps.drawMarker(scope.building, map);
            map.setCenter(marker.position);
            map.setZoom(16);
        }
    }
});
