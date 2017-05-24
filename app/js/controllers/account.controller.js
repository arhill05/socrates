var app = angular.module('app');

app.controller('accountCtrl', [
    'Auth',
    '$state',
    '$scope',
    function (Auth, $state, $scope) {
        $scope.email = "";
        $scope.password = "";
    }
]);