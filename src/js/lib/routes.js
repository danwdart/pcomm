import IndexCtrl from '../controllers/IndexCtrl';
import SampleCtrl from '../controllers/SampleCtrl';
import NotFoundCtrl from '../controllers/NotFoundCtrl';

export default function Routes(ngApp)
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
                    '/sample/:id',
                    {
                        templateUrl: 'views/sample.html',
                        controller: 'SampleCtrl',
                        controllerAs: 'sample'
                    }
                ).when(
                    '*',
                    {
                        templateUrl: 'views/404.html',
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
    .controller('IndexCtrl', ['$scope', IndexCtrl])
    .controller('SampleCtrl', ['$scope', SampleCtrl])
    .controller('NotFoundCtrl', ['$scope', NotFoundCtrl]);
};