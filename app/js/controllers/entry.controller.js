var app = angular.module('app')
    .controller('entryCtrl', ['SidebarService', '$rootScope', function(SidebarService, $rootScope){

        var self = this;
        self.onStartClick = function(){
            SidebarService.toggleSidebar();
        }
    }])