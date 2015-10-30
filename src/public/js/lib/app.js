import routes from './routes';
import ioroutes from './ioroutes';
import globals from './globals';

export default class App
{
    constructor(angular, jQuery, io)
    {
        this._angular = angular;
        this._jQuery = jQuery;
        this._io = io;
    }

    start()
    {
        this._ngApp = this._angular.module('pcomm', ['ngRoute']);
        routes(this._ngApp, this._jQuery);
        ioroutes(this._io);
        globals(this.jQuery);
    }
}