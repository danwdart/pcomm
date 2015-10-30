import routes from './routes';
import globals from './globals';

export default class App
{
    constructor(angular, jQuery)
    {
        this._angular = angular;
        this._jQuery = jQuery;
    }

    start()
    {
        this._ngApp = this._angular.module('pcomm', ['ngRoute']);
        routes(this._ngApp, this._jQuery);
        globals(this.jQuery);
    }
}