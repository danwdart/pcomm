import HeaderCtrl from '../controller/headerctrl';
import IndexCtrl from '../controller/indexctrl';
import InboxCtrl from '../controller/inboxctrl';
import FeedCtrl from '../controller/feedctrl';
import LoginCtrl from '../controller/loginctrl';
import RegisterCtrl from '../controller/registerctrl';
import AccountsCtrl from '../controller/accountsctrl';
import ComposeCtrl from '../controller/composectrl';
import MessageCtrl from '../controller/messagectrl';
import SettingsCtrl from '../controller/settingsctrl';
import NotFoundCtrl from '../controller/notfoundctrl';

import LoginService from '../service/loginservice';
import RegisterService from '../service/registerservice';

export default (ngApp, jQuery) => {
    ngApp.config(
        [
            '$routeProvider',
            //'$locationProvider',
            ($routeProvider) => {
                $routeProvider.when(
                    '/',
                    {
                        templateUrl: 'views/index.html',
                        controller: 'IndexCtrl',
                        controllerAs: 'indexctrl'
                    }
                ).when(
                    '/login',
                    {
                        templateUrl: 'views/login.html',
                        controller: 'LoginCtrl',
                        controllerAs: 'loginctrl'
                    }
                ).when(
                    '/register',
                    {
                        templateUrl: 'views/register.html',
                        controller: 'RegisterCtrl',
                        controllerAs: 'registerctrl'
                    }
                ).when(
                    '/inbox',
                    {
                        templateUrl: 'views/inbox.html',
                        controller: 'InboxCtrl',
                        controllerAs: 'inboxctrl'
                    }
                ).when(
                    '/feed',
                    {
                        templateUrl: 'views/feed.html',
                        controller: 'FeedCtrl',
                        controllerAs: 'feedctrl'
                    }
                ).when(
                    '/accounts',
                    {
                        templateUrl: 'views/accounts.html',
                        controller: 'AccountsCtrl',
                        controllerAs: 'accountsctrl'
                    }
                ).when(
                    '/new',
                    {
                        templateUrl: 'views/compose.html',
                        controller: 'ComposeCtrl',
                        controllerAs: 'composectrl'
                    }
                ).when(
                    '/message/:id',
                    {
                        templateUrl: 'views/message.html',
                        controller: 'MessageCtrl',
                        controllerAs: 'messagectrl'
                    }
                ).when(
                    '/accounts',
                    {
                        templateUrl: 'views/accounts.html',
                        controller: 'AccountsCtrl',
                        controllerAs: 'accountsctrl'
                    }
                ).when(
                    '/settings',
                    {
                        templateUrl: 'views/settings.html',
                        controller: 'SettingsCtrl',
                        controllerAs: 'settingsctrl'
                    }
                ).otherwise(
                    {
                        templateUrl: 'views/notfound.html',
                        controller: 'NotFoundCtrl',
                        controllerAs: 'notfoundctrl'
                    }
                );

                // Single file bookmarkable

                //$locationProvider.html5Mode({
                //    enabled: true
                //});
            }
        ]
    )
    .controller('HeaderCtrl', ['$scope', '$location', '$http', HeaderCtrl])
    .controller('IndexCtrl', ['$scope', 'jQuery', IndexCtrl])
    .controller('InboxCtrl', ['$scope', 'jQuery', InboxCtrl])
    .controller('FeedCtrl', ['$scope', 'jQuery', FeedCtrl])
    .controller('LoginCtrl', ['$scope', 'login', '$location', 'jQuery', LoginCtrl])
    .controller('RegisterCtrl', ['$scope', 'register', '$location', 'jQuery', RegisterCtrl])
    .controller('NotFoundCtrl', ['$scope', 'jQuery', NotFoundCtrl])
    .controller('AccountsCtrl', ['$scope', 'jQuery', AccountsCtrl])
    .controller('ComposeCtrl', ['$scope', 'jQuery', ComposeCtrl])
    .controller('MessageCtrl', ['$scope', 'jQuery', MessageCtrl])
    .controller('SettingsCtrl', ['$scope', 'jQuery', SettingsCtrl])
    
    .factory('jQuery', () => jQuery)
    .factory('login', ['$http', LoginService])
    .factory('register', ['$http', RegisterService]);
};