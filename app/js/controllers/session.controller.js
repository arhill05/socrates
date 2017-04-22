var app = angular.module('app')

app.controller('sessionCtrl', function($stateParams){
    var self = this;
    self.sessionPin = $stateParams.sessionPin;

    console.log(self.sessionPin);
})