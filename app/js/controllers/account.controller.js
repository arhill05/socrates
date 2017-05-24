var app = angular.module('app');

app.controller('accountCtrl', [
    'Auth',
    '$state',
    '$scope',
    '$firebaseObject',
    function (Auth, $state, $scope, $firebaseObject) {
        $scope.auth = null;
        $scope.user = null;
        Auth.$onAuthStateChanged(function (firebaseUser) {
            $scope.auth = firebaseUser;
            let usersRef = firebase
                .database()
                .ref()
                .child("users/" + $scope.auth.uid);
            let userObj = $firebaseObject(usersRef);
            userObj
                .$bindTo($scope, "user")
                .then(function () {
                    console.log($scope.user);
                });
        });
    }
]);