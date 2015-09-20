// Let's just require the dependencies
import 'babel/polyfill';

import * as angular from '../../bower_components/angular';
import '../../bower_components/angular-route'

// and the app
import App from './lib/app';

let app = new App(angular);
app.start(angular);