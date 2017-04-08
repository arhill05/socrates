var app = angular.module('app')
    .controller('entryCtrl', ['SidebarService', 'Auth', '$rootScope', '$state', '$firebaseArray', function (SidebarService, Auth, $rootScope, $state, $firebaseArray) {

        var vm = this;

        vm.usersRef = firebase.database().ref().child("users");
        vm.users = $firebaseArray(vm.usersRef);
        console.log(vm.users);
        vm.auth = Auth.$getAuth();
        if (vm.auth) vm.firebaseUser = auth.currentUser;
        vm.error = null;

        Auth.$onAuthStateChanged(function (firebaseUser) {
            vm.firebaseUser = firebaseUser;
        });

        vm.onInit = function () {
            vm.firebaseUser = null;
        }

        vm.onStartClick = function () {
            Auth.$signInAnonymously()
                .then(function (firebaseUser) {
                    vm.firebaseUser = firebaseUser;
                    $state.go('hello');
                    SidebarService.openSidebar();
                    toastr.info('Signed into firebase with uid: ' + firebaseUser.uid)
                })
                .catch(function (error) {
                    toastr.error('ERROR! : ' + error);
                })
        }
    }])