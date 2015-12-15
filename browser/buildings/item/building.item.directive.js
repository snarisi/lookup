app.directive('buildingItem', function () {
    return {
        restrict: 'E',
        templateUrl: 'buildings/item/building.item.html',
        constroller: 'BuildingsCtrl',
        scope: {
            building: '='
        }
    }
})
