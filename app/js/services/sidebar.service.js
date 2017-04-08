var app = angular.module('app');

app.factory('SidebarService', function ($rootScope) {
    return {
        toggleSidebar: function () {
            $rootScope.$broadcast('toggleSidebar');
        },
        closeSidebar: function() {
            $rootScope.$broadcast('closeSidebar');
        },
        openSidebar: function() {
            $rootScope.$broadcast('openSidebar');
        }
    }
})