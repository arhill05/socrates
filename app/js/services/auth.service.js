angular.module('app')
    .factory('Auth', ['$firebaseAuth', function($firebaseAuth){
        var auth = $firebaseAuth();

        return auth;
    }]);