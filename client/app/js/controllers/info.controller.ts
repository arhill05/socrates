var app = angular.module('app');

app.controller('infoCtrl', function ($rootScope, $scope, $state, $location, $firebaseObject, $firebaseArray) {
    let self = this;

    self.onInit = function () {
        let sessionID = $state.params.sessionID;
        $rootScope.currentSessionID = sessionID;
        let sessionRef = firebase
            .database()
            .ref()
            .child("sessions/" + sessionID);
        let sessionObj = $firebaseObject(sessionRef);
        sessionObj
            .$loaded()
            .then(function () {
                $scope.session = sessionObj;
                console.log($scope.session);
            })
    }

    self.onInit();
});