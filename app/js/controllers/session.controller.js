var app = angular.module('app')

app.controller('sessionCtrl', function ($scope, $stateParams, $firebaseObject, $firebaseArray) {
    var self = this;
    self.sessionPin = $stateParams.sessionPin;
    $scope.session = null;
    $scope.questions = [];

    self.onInit = function () {
        self.sessionRef = firebase.database().ref().child("sessions/").orderByChild('pin').equalTo(parseInt(self.sessionPin));
        self.sessionObj = $firebaseObject(self.sessionRef);
        self.sessionObj.$loaded().then(function () {
            self.sessionObj.forEach(function (session, key) {
                $scope.session = session;
                self.questionsRef = firebase.database().ref().child('sessions_questions').child(key);
                $scope.questions = $firebaseArray(self.questionsRef);
                $scope.questions.$loaded().then(console.log('questions loaded'))
            }, this);
        })


    }

    self.onInit();



})