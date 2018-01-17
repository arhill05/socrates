var app = angular.module('app');
app.controller('infoCtrl', function ($rootScope, $scope, $state, $location, $firebaseObject, $firebaseArray) {
    var self = this;
    self.onInit = function () {
        var sessionID = $state.params.sessionID;
        $rootScope.currentSessionID = sessionID;
        var sessionRef = firebase
            .database()
            .ref()
            .child("sessions/" + sessionID);
        var sessionObj = $firebaseObject(sessionRef);
        sessionObj
            .$loaded()
            .then(function () {
            $scope.session = sessionObj;
            console.log($scope.session);
        });
    };
    self.onInit();
});
//# sourceMappingURL=info.controller.js.map