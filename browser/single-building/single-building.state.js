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
