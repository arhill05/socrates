var app = angular.module('app')

app.controller('sessionCtrl', ['Auth', '$scope', '$state', '$firebaseObject', '$firebaseArray',
    function (Auth, $scope, $state, $firebaseObject, $firebaseArray) {
        var self = this;
        self.sessionPin = $state.params.sessionPin;
        $scope.session = null;
        $scope.questions = [];
        $scope.auth = null;
        $scope.user = null;
        $scope.showLoading = true;
        $scope.newQuestion = {
            questionText: null,
            upvotes: 0
        }

        self.onInit = function () {
            let sessionRef = firebase.database().ref().child("sessions/" + self.sessionPin);
            let sessionObj = $firebaseObject(sessionRef);
            sessionObj.$loaded().then(function () {
                $scope.session = sessionObj;
                    let questionsRef = firebase.database().ref().child('sessions_questions').child(sessionObj.$id);
                    $scope.questions = $firebaseArray(questionsRef);
                    $scope.questions.$loaded().then($scope.showLoading = false);
            })

            Auth.$onAuthStateChanged(function (firebaseUser) {
                $scope.auth = firebaseUser;
                let usersRef = firebase.database().ref().child("users/" + $scope.auth.uid);
                $scope.userObj = $firebaseObject(usersRef);
                $scope.userObj.$bindTo($scope, "user").then(function(){
                    console.log($scope.user);
                })
                // userObj.$loaded().then(function () {
                //     userObj.$bindTo($scope, "user").then(console.log($scope.user))
                //     // userObj.forEach(function (user, key) {
                //     //     $scope.user = user;
                //     //     console.log($scope.user);
                //     // })
                // }, this)
            })
        }

        self.upvoteQuestion = function (index) {
            let question = $scope.questions[index];
            let questionIndex = $scope.userObj.upvotedQuestionIds.indexOf(question.$id)
            if(questionIndex == -1){
                $scope.questions[index].upvotes += 1;
                $scope.questions.$save(index);
                $scope.userObj.upvotedQuestionIds.push(question.$id);
                $scope.userObj.$save();
            } else {
                $scope.questions[index].upvotes -= 1;
                $scope.questions.$save(index);
                $scope.userObj.upvotedQuestionIds.splice(questionIndex, 1);
                $scope.userObj.$save()
            }
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
    }])