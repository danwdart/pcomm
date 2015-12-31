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

import {
    LoginFactory,
    RegisterFactory,
    isLoggedInFactory,
    LogoutFactory
} from '../factory/authfactory';

import SettingsFactory from '../factory/settingsfactory';
import FeedFactory from '../factory/feedfactory';

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
    .controller('HeaderCtrl', ['$scope', 'isloggedin', 'logout', '$location', HeaderCtrl])
    .controller('IndexCtrl', ['$scope', IndexCtrl])
    .controller('InboxCtrl', ['$scope', InboxCtrl])
    .controller('FeedCtrl', ['$scope', 'feed', FeedCtrl])
    .controller('LoginCtrl', ['$scope', 'login', '$location', LoginCtrl])
    .controller('RegisterCtrl', ['$scope', 'register', '$location', RegisterCtrl])
    .controller('NotFoundCtrl', ['$scope', NotFoundCtrl])
    .controller('AccountsCtrl', ['$scope', AccountsCtrl])
    .controller('ComposeCtrl', ['$scope', ComposeCtrl])
    .controller('MessageCtrl', ['$scope', MessageCtrl])
    .controller('SettingsCtrl', ['$scope', 'settings', SettingsCtrl])
    
    .factory('jQuery', () => jQuery)
    .factory('login', ['$http', LoginFactory])
    .factory('register', ['$http', RegisterFactory])
    .factory('isloggedin', ['$http', isLoggedInFactory])
    .factory('logout', ['$http', LogoutFactory])
    .factory('settings', ['$http', SettingsFactory])
    .factory('feed', ['$http', FeedFactory]);
};