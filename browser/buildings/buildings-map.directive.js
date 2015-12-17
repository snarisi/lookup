app.directive('luMapBuildings', function (Maps, BuildingUtils, $stateParams) {
    return {
        restrict: 'E',
        scope: {
            buildings: '=',
            map: '='
        },
        link: function (scope, element, attrs) {

        }
    };
});
