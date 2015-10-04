import IndexCtrl from '../controllers/IndexCtrl';
import AccountsCtrl from '../controllers/AccountsCtrl';
import AuthenticationCtrl from '../controllers/AuthenticationCtrl';
import NewMessageCtrl from '../controllers/NewMessageCtrl';
import MessageCtrl from '../controllers/MessageCtrl';
import SettingsCtrl from '../controllers/SettingsCtrl';
import NotFoundCtrl from '../controllers/NotFoundCtrl';

export default function Routes(ngApp, jQuery)
{
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
                    '/authentication',
                    {
                        templateUrl: 'views/authentication.html',
                        controller: 'AuthenticationCtrl',
                        controllerAs: 'authentication'
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
    .config([
        'FacebookProvider',
        (FacebookProvider) => {
            FacebookProvider.init('109359476083346');
        }
    ])
    .controller('AuthenticationCtrl', ['$scope', 'Facebook', AuthenticationCtrl])
    .controller('IndexCtrl', ['$scope', 'jQuery', IndexCtrl])
    .controller('NotFoundCtrl', ['$scope', 'jQuery', NotFoundCtrl])
    .controller('AccountsCtrl', ['$scope', 'jQuery', AccountsCtrl])
    .controller('NewMessageCtrl', ['$scope', 'jQuery', NewMessageCtrl])
    .controller('MessageCtrl', ['$scope', 'jQuery', MessageCtrl])
    .controller('SettingsCtrl', ['$scope', 'jQuery', SettingsCtrl])
    .factory('jQuery', () => jQuery);
};