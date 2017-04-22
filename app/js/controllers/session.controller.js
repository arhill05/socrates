var app = angular.module('app')

app.controller('sessionCtrl', function ($scope, $stateParams, $firebaseObject, $firebaseArray) {
    var self = this;
    self.sessionPin = $stateParams.sessionPin;
    $scope.session = null;
    $scope.questions = [];

    self.onInit = function () {
        self.sessionRef = firebase.database().ref().child("db/sessions/").orderByChild('pin').equalTo(parseInt(self.sessionPin));
        self.sessionObj = $firebaseObject(self.sessionRef);
        self.sessionObj.$loaded().then(function () {
            self.sessionObj.forEach(function (session) {
                session.questions.forEach(question => {
                    if (question && question != null)
                        $scope.questions.push(question);
                })
                $scope.session = session;
            }, this);
        })
    }

    self.onInit();



})