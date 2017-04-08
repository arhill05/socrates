var app = angular.module('app')
    .controller('shellCtrl', function($rootScope){
        var self = this;

        $rootScope.$on('openSidebar', function(){
            if(self.showSidebar) return;
            self.showSidebar = true;
        })

        $rootScope.$on('closeSidebar', function(){
            if(!self.showSidebar) return;
            self.showSidebar = false;
        })

        $rootScope.$on('toggleSidebar', function(){
            self.showSidebar = !self.showSidebar;
        })

        // todo : animate sidebar collapse
        self.showSidebar = true;
    });