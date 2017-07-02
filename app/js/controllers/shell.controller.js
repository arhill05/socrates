var app = angular
    .module('app')
    .controller('shellCtrl', [
        'Auth',
        '$rootScope',
        '$state',
        function (Auth, $rootScope, $state) {
            var self = this;
            self.activeNavItem = 'session';
            $rootScope.$state = $state;
            $rootScope.currentSessionID = $state.params.sessionID;
            console.log(self.$state)

            self.signOut = function () {
                Auth.$signOut();
                $state.go('start');
            };

            self.onAccountClick = () => {
                var authData = Auth.$getAuth();
                if (authData) 
                    $state.go('account')
                else 
                    $state.go('login');
                }
            
            self.goToHome = () => {
                $state.go('start');
            }

            self.removeBackground = () => {
                if ($state.includes('login')) 
                    return true;
                else 
                    return false;
                }
            
            self.onHomeClick = () => {
                $state.go('start');
                self.activeNavItem = 'start';
            }

            self.onSessionClick = () => {
                if ($rootScope.currentSessionID && $rootScope.currentSessionID != "") {
                    $state.go('session', {sessionID: $rootScope.currentSessionID})
                    self.activeNavItem = 'session';
                } else {
                    alertify.message('You must enter a session before you can navigate to a session!');
                    $state.go('start');
                    self.activeNavItem = 'start';
                }
            }

            self.onInfoClick = () => {
                if ($rootScope.currentSessionID && $rootScope.currentSessionID != "") {
                    $state.go('info', {sessionID: $rootScope.currentSessionID})
                    self.activeNavItem = 'info';
                } else {
                    alertify.message('You must enter a session before you can view session info!');
                    $state.go('start');
                }
            }

            self.onUserClick = () => {
                let auth = Auth.$getAuth();
                if (auth && !auth.isAnonymous) 
                    $state.go('account');
                else 
                    $state.go('login');
                
                self.activeNavItem = 'user';
            }

            $rootScope.$on('enteringSession', () => {
                self.activeNavItem = 'session';
            })
        }
    ]);