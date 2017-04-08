var app = angular.module('app')
    .controller('entryCtrl', ['SidebarService', '$rootScope', '$state', function(SidebarService, $rootScope, $state){

        var self = this;
        self.onStartClick = function(){
            SidebarService.openSidebar();
            $state.go('hello');
        }
    }])