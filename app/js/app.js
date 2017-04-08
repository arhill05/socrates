(function () {

    var app = angular.module('app', ['ui.router']);

    app.config(function ($stateProvider) {
        var helloState = {
            name: 'hello',
            url: '/hello',
            template: '<h2>hello world</h2>'
        };

        var aboutState = {
            name: 'about',
            url: '/about',
            template: '<h2>about</h2>'
        };

        $stateProvider.state(helloState);
        $stateProvider.state(aboutState);
    })

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
    })
})()