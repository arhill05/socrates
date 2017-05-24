var app = angular.module('app');

app.controller('loginCtrl', [
    'Auth',
    '$state',
    '$scope',
    function (Auth, $state, $scope) {
        $scope.email = "";
        $scope.password = "";

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
                    $scope.email = "";
                    $scope.password = "";
                    Auth
                        .$authWithPassword(credentials)
                        .then(authData => {
                            console.log('Logged in as:', authData.uid)
                            $state.go('account');
                        })
                })
                .catch(error => {
                    toastr.error(error.message);
                })
        }
    }
]);