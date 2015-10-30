import HeaderCtrl from '../controllers/HeaderCtrl';
import IndexCtrl from '../controllers/IndexCtrl';
import LoginCtrl from '../controllers/LoginCtrl';
import RegisterCtrl from '../controllers/RegisterCtrl';
import AccountsCtrl from '../controllers/AccountsCtrl';
import NewMessageCtrl from '../controllers/NewMessageCtrl';
import MessageCtrl from '../controllers/MessageCtrl';
import SettingsCtrl from '../controllers/SettingsCtrl';
import NotFoundCtrl from '../controllers/NotFoundCtrl';

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
                        controllerAs: 'index'
                    }
                ).when(
                    '/login',
                    {
                        templateUrl: 'views/login.html',
                        controller: 'LoginCtrl',
                        controllerAs: 'login'
                    }
                ).when(
                    '/register',
                    {
                        templateUrl: 'views/register.html',
                        controller: 'RegisterCtrl',
                        controllerAs: 'register'
                    }
                ).when(
                    '/accounts',
                    {
                        templateUrl: 'views/accounts.html',
                        controller: 'AccountsCtrl',
                        controllerAs: 'accounts'
                    }
                ).when(
                    '/new',
                    {
                        templateUrl: 'views/newmessage.html',
                        controller: 'NewMessageCtrl',
                        controllerAs: 'newmessage'
                    }
                ).when(
                    '/message/:id',
                    {
                        templateUrl: 'views/message.html',
                        controller: 'MessageCtrl',
                        controllerAs: 'message'
                    }
                ).when(
                    '/accounts',
                    {
                        templateUrl: 'views/accounts.html',
                        controller: 'AccountsCtrl',
                        controllerAs: 'accounts'
                    }
                ).when(
                    '/settings',
                    {
                        templateUrl: 'views/settings.html',
                        controller: 'SettingsCtrl',
                        controllerAs: 'settings'
                    }
                ).otherwise(
                    {
                        templateUrl: 'views/notfound.html',
                        controller: 'NotFoundCtrl',
                        controllerAs: 'notfound'
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
    .controller('LoginCtrl', ['$scope', 'jQuery', LoginCtrl])
    .controller('RegisterCtrl', ['$scope', 'jQuery', RegisterCtrl])
    .controller('NotFoundCtrl', ['$scope', 'jQuery', NotFoundCtrl])
    .controller('AccountsCtrl', ['$scope', 'jQuery', AccountsCtrl])
    .controller('NewMessageCtrl', ['$scope', 'jQuery', NewMessageCtrl])
    .controller('MessageCtrl', ['$scope', 'jQuery', MessageCtrl])
    .controller('SettingsCtrl', ['$scope', 'jQuery', SettingsCtrl])
    .factory('jQuery', () => jQuery);
};