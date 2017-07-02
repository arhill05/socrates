(function () {

    var app = angular.module('app', ['ui.router', 'firebase', 'ngAnimate']);

    app.config(function ($stateProvider, $urlRouterProvider) {
        var entryState = {
            name: 'start',
            url: '/',
            templateUrl: './views/start.html'
        };

        var pinEntryState = {
            name: 'pinEntry',
            url: '/join',
            templateUrl: './views/pinEntry.html'
        };

        var sessionState = {
            name: 'session',
            url: '/questions/{sessionID}',
            templateUrl: './views/session.html'
        };

        var loginState = {
            name: 'login',
            url: '/login',
            templateUrl: './views/login.html'
        };

        var accountState = {
            name: 'account',
            url: '/account',
            templateUrl: './views/account.html'
        }

        var infoState = {
            name: 'info',
            url: '/info/{sessionID}',
            templateUrl: '/views/info.html'
        }

        $stateProvider.state(entryState);
        $stateProvider.state(pinEntryState);
        $stateProvider.state(loginState);
        $stateProvider.state(sessionState);
        $stateProvider.state(accountState);
        $stateProvider.state(infoState);

        $urlRouterProvider.otherwise('/');
    });

    app.config(function () {
        var config = {
            apiKey: "AIzaSyBltC1Tm4OCAFcOHREGYM_jjMjJ15Bxt6c",
            authDomain: "socrates-55235.firebaseapp.com",
            databaseURL: "https://socrates-55235.firebaseio.com",
            projectId: "socrates-55235",
            storageBucket: "socrates-55235.appspot.com",
            messagingSenderId: "1083849915004"
        };
        firebase.initializeApp(config);
        console.log('firebase initialized');
        $("#loader").hide();
    });
})();