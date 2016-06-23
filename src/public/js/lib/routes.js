import HeaderCtrl from '../controller/headerctrl';
import IndexCtrl from '../controller/indexctrl';
import InboxCtrl from '../controller/inboxctrl';
import FeedCtrl from '../controller/feedctrl';
import LoginCtrl from '../controller/loginctrl';
import RegisterCtrl from '../controller/registerctrl';
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
import InboxFactory from '../factory/inboxfactory';

import templates from './templates';

export default (ngApp, jQuery) => {
    templates(ngApp);

    ngApp.run(
        [
            '$rootScope',
            ($rootScope) =>
                $rootScope.$on(
                    '$routeChangeStart',
                    (next, last) => {
                        if ($rootScope.clearFlash)
                            $rootScope.flash = {};
                        if (0 < Object.keys($rootScope.flash).length)
                            $rootScope.clearFlash = true;
                    }
                )
        ])
        .config(
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
                    '/message/:id',
                    {
                        templateUrl: 'views/message.html',
                        controller: 'MessageCtrl',
                        controllerAs: 'messagectrl'
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
    .controller('InboxCtrl', ['$scope', 'inbox', '$location', InboxCtrl])
    .controller('FeedCtrl', ['$scope', 'feed', '$location', FeedCtrl])
    .controller('LoginCtrl', ['$scope', 'login', '$location', LoginCtrl])
    .controller('RegisterCtrl', ['$scope', 'register', '$location', RegisterCtrl])
    .controller('NotFoundCtrl', ['$scope', NotFoundCtrl])
    .controller('MessageCtrl', ['$scope', MessageCtrl])
    .controller('SettingsCtrl', ['$scope', 'settings', SettingsCtrl])

    .factory('jQuery', () => jQuery)
    .factory('login', ['$http', LoginFactory])
    .factory('register', ['$http', RegisterFactory])
    .factory('isloggedin', ['$http', isLoggedInFactory])
    .factory('logout', ['$http', LogoutFactory])
    .factory('settings', ['$http', SettingsFactory])
    .factory('feed', ['$http', FeedFactory])
    .factory('inbox', ['$http', InboxFactory]);
};
