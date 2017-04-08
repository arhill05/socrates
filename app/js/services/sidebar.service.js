var app = angular.module('app');

app.factory('SidebarService', function ($rootScope) {
    return {
        toggleSidebar: function () {
            $rootScope.$broadcast('toggleSidebar');
        }
    }
})