var app = angular.module('app')

app.controller('sessionCtrl', function ($scope, $stateParams, $firebaseObject, $firebaseArray) {
    var self = this;
    self.sessionPin = $stateParams.sessionPin;
    $scope.session = null;
    $scope.questions = [];
    $scope.showLoading = true;
    $scope.newQuestion = {
        questionText: null,
        upvotes: 0
    }

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

    self.upvoteQuestion = function (index) {
        $scope.questions[index].upvotes += 1;
        $scope.questions.$save(index);
    }

    self.addQuestion = function () {
        if ($scope.newQuestion.questionText != null) {
            $scope.questions.$add($scope.newQuestion);
            $scope.newQuestion.questionText = null;
        } else {
            toastr.error('Please enter a question!');
        }
    }

    self.onInit();
})