app.directive('luFilter', function () {
    return {
        restrict: 'E',
        templateUrl: '/buildings/filter/filter.html',
        scope: {
            options: '=',
        },
        link: function (scope, element, attrs) {
            var $searchBar = element.find('input');
            var $list = element.find('ul');
            console.log($list);
            $list.addClass('hidden');

            $searchBar.on('focus', function () {
                $list.removeClass('hidden');
            });

            $searchBar.on('blur', function () {
                $list.addClass('hidden');
            });
        }
    }
})
