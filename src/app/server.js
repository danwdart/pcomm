import 'babel/polyfill';
import express from 'express';
import http from 'http';
import socketio from 'socket.io';
import XmppClient from 'node-xmpp-client';
import config from '../config/app.json';
import routes from './lib/routes';
import ioroutes from './lib/ioroutes';
import bgroutes from './lib/bgroutes';

let app = express(),
    server = http.Server(app),
    io = socketio(server),
    port = ('undefined' !== process.env['PORT'])?
        config.port:
        process.env['PORT'];

routes(app);

ioroutes(io, XmppClient);

bgroutes();

app.use(express.static(__dirname + '/../public'));

server.listen(
    port,
    () => console.log('Listening on port ' + port)
);
