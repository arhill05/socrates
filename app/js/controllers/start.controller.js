var app = angular.module('app')
    .controller('startCtrl', ['SidebarService', 'Auth', '$rootScope', '$state', '$firebaseArray', function (SidebarService, Auth, $rootScope, $state, $firebaseArray) {

        var vm = this;

        vm.usersRef = firebase.database().ref().child("users");
        vm.users = $firebaseArray(vm.usersRef);
        console.log(vm.users);
        vm.auth = Auth.$getAuth();
        if (vm.auth) {
            vm.firebaseUser = vm.auth.currentUser;
            $state.go('pinEntry');
        }
        vm.error = null;

        vm.onInit = function () {
            vm.firebaseUser = null;
        };

        vm.onStartClick = function () {
            Auth.$signInAnonymously()
                .then(function (firebaseUser) {
                    vm.firebaseUser = firebaseUser;
                    $state.go('pinEntry');
                    vm.usersRef.child(firebaseUser.uid).set({
                        anonymous: true,
                        email: "",
                        upvotedQuestionIds: [1, 2, 3]
                    });
                    SidebarService.openSidebar();
                    toastr.info('Signed into firebase with uid: ' + firebaseUser.uid);
                })
                .catch(function (error) {
                    toastr.error('ERROR! : ' + error);
                });
        };

        vm.signOut = function () {
            Auth.$signOut();
            console.log('logged out');
        };
    }]);