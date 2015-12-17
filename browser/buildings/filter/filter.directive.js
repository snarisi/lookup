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
