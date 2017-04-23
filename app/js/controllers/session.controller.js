var app = angular.module('app')

app.controller('sessionCtrl', function ($scope, $stateParams, $firebaseObject, $firebaseArray) {
    var self = this;
    self.sessionPin = $stateParams.sessionPin;
    $scope.session = null;
    $scope.questions = [];
    $scope.showLoading = true;

    self.onInit = function () {
        let sessionRef = firebase.database().ref().child("sessions/").orderByChild('pin').equalTo(parseInt(self.sessionPin));
        let sessionObj = $firebaseObject(sessionRef);
        sessionObj.$loaded().then(function () {
            sessionObj.forEach(function (session, key) {
                $scope.session = session;
                let questionsRef = firebase.database().ref().child('sessions_questions').child(key);
                $scope.questions = $firebaseArray(questionsRef);
                $scope.questions.$loaded().then($scope.showLoading = false)
            }, this);
        })
    }

    self.onInit();
})