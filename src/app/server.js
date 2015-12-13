import 'babel-polyfill';
import express from 'express';
import http from 'http';
import sessions from 'client-sessions';
import bodyParser from 'body-parser';
import socketio from 'socket.io';
import XmppClient from 'node-xmpp-client';
import config from '../config/app.json';
import routes from './lib/routes';
import ioroutes from './lib/ioroutes';
import bgroutes from './lib/bgroutes';

// db setup
import './lib/db';

let app = express(),
    server = http.Server(app),
    io = socketio(server),
    port = ('undefined' !== process.env['PORT'])?
        config.port:
        process.env['PORT'];

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/../public'));

app.use(sessions({
    cookieName: 'session',
    secret: 'YouShouldProbablyReplaceThisBecauseItsASecurityRisk',
    duration: 24 * 60 * 60 * 1000,
    activeDuration: 1000 * 60 * 5,
    httpOnly: true,
    ephemeral: false
}));

routes(app);

ioroutes(io, XmppClient);

bgroutes();

server.listen(
    port,
    () => console.log('Listening on port ' + port)
);
