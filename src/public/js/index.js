import 'babel-polyfill';
import io from 'socket.io-client';
// and the app
import App from './lib/app';

// we're using included deps now
let app = new App(angular, jQuery, io);
app.start();