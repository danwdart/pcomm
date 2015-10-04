// Let's just require the dependencies
// No dependencies - there was hell here
require('babel/polyfill');

// and the app
import App from './lib/app';

let app = new App(angular, jQuery);
app.start();