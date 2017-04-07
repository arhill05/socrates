(function(){

    var app = angular.module('app', ['ui.router']);

    app.config(function($stateProvider){
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
})()