var app = angular.module('app')

app.controller('pinEntryCtrl', function ($state) {
    var self = this;
    self.sessionPin = null;

    self.onGoClick = function () {
        if (self.sessionPin && self.sessionPin != null) {
            console.log('going to session id ' + self.sessionPin);
            $state.go('session', {sessionPin: self.sessionPin})
        }
    }
})