app.directive('luFilter', function () {
    return {
        restrict: 'E',
        templateUrl: '/buildings/filter/filter.html',
        scope: {
            options: '=',
        },
    }
})
