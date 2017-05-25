var app = angular.module('app');

app.controller('accountCtrl', [
    'Auth',
    '$state',
    '$scope',
    '$location',
    '$firebaseObject',
    '$firebaseArray',
    function (Auth, $state, $scope, $location, $firebaseObject, $firebaseArray) {
        const usersRef = firebase
            .database()
            .ref()
            .child('users/');
        const sessionsRef = firebase
            .database()
            .ref()
            .child('sessions/');
        const usersSessionsRef = firebase
            .database()
            .ref()
            .child('users_sessions/');

        $scope.auth = null;
        $scope.user = null;
        $scope.newSession = {
            id: null,
            title: null,
            description: null
        }
        $scope.addingSession = false;
        Auth.$onAuthStateChanged(function (firebaseUser) {
            $scope.auth = firebaseUser;
            if ($scope.auth) {
                let usersRef = firebase
                    .database()
                    .ref()
                    .child("users/" + $scope.auth.uid);
                let userObj = $firebaseObject(usersRef);
                userObj.$bindTo($scope, "user");

                let currentUserSessionsRef = usersSessionsRef.child($scope.auth.uid);
                $scope.ownedSessions = $firebaseArray(currentUserSessionsRef);
            }
        });

        this.goToSession = (sessionId) => {
            $location.path('questions/' + sessionId);
        }

        this.removeSession = (session) => {
            sessionsRef
                .child(session.$id)
                .remove();
            usersSessionsRef
                .child($scope.auth.uid + '/' + session.$id)
                .remove();
        }

        this.addSession = () => {
            sessionsRef.once('value', (snapshot) => {
                if (snapshot.hasChild($scope.newSession.id.toString())) {
                    toastr.error('A session with this pin already exists. Please choose another pin.');
                    return;
                } else {

                    sessionsRef
                        .child($scope.newSession.id.toString())
                        .set({title: $scope.newSession.title, description: $scope.newSession.description, sessionOwnerUID: $scope.auth.uid});

                    usersSessionsRef
                        .child($scope.auth.uid + '/' + $scope.newSession.id.toString())
                        .set({description: $scope.newSession.description, title: $scope.newSession.title});

                    $scope.newSession.title = null;
                    $scope.newSession.description = null;
                    $scope.newSession.id = null;
                    $scope.addingSession = false;
                }
            })
        }

        this.startAdd = () => {
            $scope.addingSession = true;
        }

        this.cancelAdd = () => {
            $scope.addingSession = false;
        }
    }
]);