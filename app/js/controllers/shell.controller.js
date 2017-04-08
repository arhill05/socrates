var app = angular.module('app')
    .controller('shellCtrl', function($rootScope){
        var self = this;

        $rootScope.$on('toggleSidebar', function(){
            self.showSidebar = !self.showSidebar;
        })

        // todo : animate sidebar collapse
        self.showSidebar = true;
    });