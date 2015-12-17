app.filter('unique', function () {

    return function (items) {
        var filteredItems = [];
        var itemsSeen = {};

        items.forEach(function (item) {
            if (!itemsSeen[item._id]) {
                itemsSeen[item._id] = true;
                filteredItems.push(item);
            }
        });
        return filteredItems;
    }
});
