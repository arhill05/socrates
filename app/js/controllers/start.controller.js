var app = angular
    .module('app')
    .controller('startCtrl', [
        'SidebarService',
        'Auth',
        '$rootScope',
        '$state',
        '$firebaseArray',
        '$location',
        function (SidebarService, Auth, $rootScope, $state, $firebaseArray, $location) {

            var vm = this;

            vm.sessionID = "";
            vm.usersRef = firebase
                .database()
                .ref()
                .child("users");
            vm.users = $firebaseArray(vm.usersRef);
            vm.auth = Auth.$getAuth();
            if (vm.auth) {
                vm.firebaseUser = vm.auth.currentUser;
            }
            vm.error = null;

            vm.onInit = function () {
                vm.firebaseUser = null;
                $("#id-input").focus();
            };

            vm.onStartClick = function () {
                if (!vm.firebaseUser) {
                    Auth
                        .$signInAnonymously()
                        .then(function (firebaseUser) {
                            vm.firebaseUser = firebaseUser;
                            vm
                                .usersRef
                                .child(firebaseUser.uid)
                                .set({anonymous: true, email: "", upvotedQuestionIds: []});
                            vm.goToSession();
                            alertify.message('Signed into firebase with uid: ' + firebaseUser.uid);
                        })
                        .catch(function (error) {
                            alertify.error('ERROR! : ' + error);
                        });
                } else {
                    vm.goToSession();
                }
            };

            vm.goToSession = function () {
                if (vm.sessionID && vm.sessionID !== null && vm.sessionID !== "") {
                    vm
                        .usersRef
                        .child(vm.sessionID)
                        .once('value', (snapshot) => {
                            let exists = (snapshot.val() !== null);
                            if (exists) {
                                console.log('going to session id ' + self.sessionID);
                                $location.path('questions/' + self.sessionID);
                            } else {
                                alertify.error(`A session with id ${vm.sessionID} does not exist!`);
                            }
                        })
                } else {
                    alertify.error('Please enter a valid session ID!');
                }
            }

            vm.signOut = function () {
                Auth.$signOut();
            };

            vm.onLoginClick = function () {
                if(vm.firebaseUser) Auth.$signOut();
                $state.go('login');
            }

            vm.onAccountClick = function () {
                $state.go('account');
            }

            vm.onInit();
        }
    ]);