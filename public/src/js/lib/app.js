import routes from './routes';
import ioroutes from './ioroutes';
import globals from './globals';

export default class App
{
    constructor(angular, jQuery, io, config)
    {
        this._angular = angular;
        this._jQuery = jQuery;
        this._io = io;
        this._config = config;
    }

    start()
    {
        this._ngApp = this._angular.module('pcomm', ['ngRoute']);
        routes(this._ngApp, this._jQuery);
        ioroutes(this._io, this._config);
        globals(this._jQuery);
    }
}