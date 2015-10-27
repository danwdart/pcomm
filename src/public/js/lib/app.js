import Routes from './routes';

export default class App
{
    constructor(angular, jQuery)
    {
        this._angular = angular;
        this._jQuery = jQuery;
    }

    start()
    {
        this._ngApp = this._angular.module('pcomm', ['ngRoute', 'facebook']);
        this.setupRoutes();
    }

    setupRoutes()
    {
        Routes(this._ngApp, this._jQuery);
    }
}