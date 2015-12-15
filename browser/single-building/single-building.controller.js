app.controller('SingleBuildingCtrl', function ($scope, $stateParams, BuildingUtils) {
    BuildingUtils.findById($stateParams.id)
        .then(building => {
            $scope.building = building;
        });
});
