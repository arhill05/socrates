var app = angular.module('app');

app.controller('pinEntryCtrl', function ($state, $location) {
    var self = this;
    self.sessionPin = null;

    self.onGoClick = function () {
        if (self.sessionPin && self.sessionPin !== null) {
            console.log('going to session id ' + self.sessionPin);
            $location.path('questions/' + self.sessionPin);
        }
    };
});