app.directive('luMap', function (Maps) {
    return {
        restrict: 'E',
        scope: {
            map: '=',
            buildings: '='
        },
        link: function (scope, element, attrs) {
            var mapDiv = element[0];
            var map = Maps.initializeMap(mapDiv);

            scope.buildings.forEach(function (building) {
                var marker = Maps.drawMarker(building, map);
                map.setCenter(marker.position);
                map.setZoom(16);
            });

        }
    }
});
