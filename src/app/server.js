import 'babel-polyfill';
import express from 'express';
import http from 'http';
import sessions from 'client-sessions';
import bodyParser from 'body-parser';
import socketio from 'socket.io';
import XmppClient from 'node-xmpp-client';
import passport from 'passport';
import passportsetup from './lib/passport/setup';
import config from '../config/app';
import routes from './lib/routes';
import ioroutes from './lib/ioroutes';
import bgroutes from './lib/bgroutes';

// db setup
import './lib/db';

let app = express(),
    server = http.Server(app),
    io = socketio(server),
    port = ('undefined' === typeof process.env.PORT)?
        config.port:
        process.env.PORT,
    ip = ('undefined' === typeof process.env.IP)?
        config.ip:
        process.env.IP;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* just in case
app.set('views', __dirname + '/../src/public');
app.set('view engine', 'jade');
*/

app.use(express.static(__dirname + '/../public'));

app.use(sessions({
    cookieName: 'session',
    secret: 'YouShouldProbablyReplaceThisBecauseItsASecurityRisk',
    duration: 24 * 60 * 60 * 1000,
    activeDuration: 1000 * 60 * 5,
    httpOnly: true,
    ephemeral: false
}));

passportsetup(app);

routes(app);

ioroutes(io, XmppClient);

bgroutes();

server.listen(
    port,
    ip,
    () => console.log('Listening on port', port, 'on IP', ip)
);
