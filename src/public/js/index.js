import 'babel-polyfill';

// and the app
import App from './lib/app';

// we're using included deps now
let app = new App(angular, jQuery, io);
app.start();