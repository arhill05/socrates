var app = angular.module('app');

app.controller('loginCtrl', [
    'Auth',
    '$state',
    '$scope',
    function (Auth, $state, $scope) {
        $scope.email = "";
        $scope.password = "";
        const usersRef = firebase
            .database()
            .ref()
            .child("users/");

        this.login = () => {
            let credentials = {
                email: $scope.email,
                password: $scope.password
            };

            Auth
                .$signInWithEmailAndPassword($scope.email, $scope.password)
                .then(authData => {
                    console.log('Logged in as:', authData.uid)
                    $scope.email = "";
                    $scope.password = "";
                    $state.go('account');
                })
                .catch(error => {
                    toastr.error(error.message);
                })
        }

        this.createAccount = () => {
            let credentials = {
                email: $scope.email,
                password: $scope.password
            };
            Auth
                .$createUserWithEmailAndPassword($scope.email, $scope.password)
                .then(userdata => {
                    usersRef
                        .child(userdata.uid)
                        .set({anonymous: false, email: $scope.email, upvotedQuestionIds: []})

                    Auth
                        .$signInWithEmailAndPassword($scope.email, $scope.password)
                        .then(authData => {
                            console.log('Logged in as:', authData.uid)

                            $scope.email = "";
                            $scope.password = "";
                            $state.go('account');
                        })
                })
                .catch(error => {
                    toastr.error(error.message);
                })
        }
    }
]);