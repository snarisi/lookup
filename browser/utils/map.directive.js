app.directive('luMap', function (Maps) {
    return {
        restrict: 'E',
        scope: {
            OTHERmap: '=',
            buildings: '='
        },
        link: function (scope, element, attrs) {
            var mapDiv = element[0];
            var map = Maps.initializeMap(mapDiv);
            var markers = [];

            scope.OTHERmap = map;
            console.log(scope);

            // scope.buildings.forEach(function (building) {
            //     var marker = Maps.drawMarker(building, map);
            //     markers.push(marker);
            // });
            //
            // if (markers.length === 1) {
            //     map.setCenter(markers[0].position);
            //     map.setZoom(16);
            // } else {
            //
            // }
        }
    }
});
