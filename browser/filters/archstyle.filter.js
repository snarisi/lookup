app.filter('architectAndStyle', function () {
    return function (items, filters) {
        if (!items) return;
        if (Object.keys(filters).length === 0) return items;

        var filteredBuildings = [];

        items.forEach(function (item) {
            if (filters[item.architect._id] || filters[item.style._id]) {
                filteredBuildings.push(item);
            }
        });

        return filteredBuildings;
    }
})
