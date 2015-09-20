import Routes from './routes';

export default class App
{
    constructor(angular)
    {
        this._angular = angular;
    }

    start()
    {
        this._ngApp = this._angular.module('pcomm', ['ngRoute']);
        this.setupRoutes();
    }

    setupRoutes()
    {
        Routes(this._ngApp);
    }
}