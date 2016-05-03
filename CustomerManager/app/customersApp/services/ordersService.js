(function () {

    var injectParams = ['$http', '$q'];

    var ordersFactory = function ($http, $q) {
        var serviceBase = '/api/dataservice/',
            factory = {};

factory.insertOrder = function (order) {
    return $http.post(serviceBase + 'postOrder', order).then(function (results) {
        order.id = results.data.id;
        return results.data;
    });
};

factory.newOrder = function () {
    return $q.when({id: 0});
};

factory.updateOrder = function (order) {
    return $http.put(serviceBase + 'putOrder/' + order.id, order).then(function (status) {
        return status.data;
    });
};

factory.deleteOrder = function (id) {
    return $http.delete(serviceBase + 'deleteOrder/' + id).then(function (status) {
        return status.data;
    });
};

factory.getOrder = function (id) {
    //then does not unwrap data so must go through .data property
    //success unwraps data automatically (no need to call .data property)
    return $http.get(serviceBase + 'orderById/' + id).then(function (results) {
        extendOrders([results.data]);
        return results.data;
    });
};

ordersFactory.$inject = injectParams;

angular.module('ordersApp').factory('ordersService', ordersFactory);

}());
