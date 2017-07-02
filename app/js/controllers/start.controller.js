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

            var self = this;
            self.currentUser = Auth;
            self.sessionID = "";
            self.currentUser = null;
            self.error = null;

            self.onInit = function () {
                self.getUsers();
                self.getAuth();
                $("#id-input").focus();
            };

            self.onStartClick = function () {
                if (!self.currentUser) {
                    Auth
                        .$signInAnonymously()
                        .then(function (currentUser) {
                            self.currentUser = currentUser;
                            self
                                .usersRef
                                .child(currentUser.uid)
                                .set({anonymous: true, email: "", upvotedQuestionIds: []});
                            self.goToSession();
                            alertify.message('Signed into firebase with uid: ' + currentUser.uid);
                        })
                        .catch(function (error) {
                            alertify.error('ERROR! : ' + error);
                        });
                } else {
                    self.goToSession();
                }
            };

            self.goToSession = function () {
                if (self.sessionID && self.sessionID !== null && self.sessionID !== "") {
                    let sessionsRef = firebase
                        .database()
                        .ref()
                        .child("sessions")

                    sessionsRef
                        .child(parseInt(self.sessionID))
                        .once('value', (snapshot) => {
                            let snapshotVal = snapshot.val();
                            let exists = (snapshot.val() !== null);
                            if (exists) {
                                console.log('going to session id ' + self.sessionID);
                                $state.go('session', {sessionPin: self.sessionID})
                            } else {
                                alertify.error(`A session with id ${self.sessionID} does not exist!`);
                            }
                        })
                } else {
                    alertify.error('Please enter a valid session ID!');
                }
            }

            self.signOut = function () {
                Auth.$signOut();
            };

            self.onLoginClick = function () {
                if (self.currentUser) 
                    Auth.$signOut();
                $state.go('login');
            }

            self.onAccountClick = function () {
                $state.go('account');
            }

            self.getUsers = function () {
                self.usersRef = firebase
                    .database()
                    .ref()
                    .child("users");
                self.users = $firebaseArray(self.usersRef);
            }

            self.getAuth = function () {
                let auth = Auth.$getAuth();
                if (auth) 
                    self.currentUser = auth;
                }
            
            self.onInit();
        }
    ]);