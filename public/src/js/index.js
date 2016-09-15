import io from 'socket.io-client';
import angular from 'angular';
import jQuery from 'jquery';

// and the app
import App from './lib/app';

// we're using included deps now
let app = new App(angular, jQuery, io);
app.start();
