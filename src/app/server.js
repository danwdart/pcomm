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
import repl from 'repl';

// db setup
import db from './lib/db';

let app = express(),
    server = http.Server(app),
    io = socketio(server),
    port = ('undefined' === typeof process.env.PORT)?
        config.port:
        process.env.PORT,
    ip = ('undefined' === typeof process.env.IP)?
        config.ip:
        process.env.IP,
    // for docker
    dbhost = ('undefined' === typeof process.env.MONGO_PORT_27017_TCP_ADDR)?
        config.database.host:
        process.env.MONGO_PORT_27017_TCP_ADDR;

db(dbhost);

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

let replServer = repl.start({prompt: 'pcomm > '});
replServer.context.app = app;
replServer.context.server = server;
replServer.context.io = io;
replServer.context.XmppClient = XmppClient;

replServer.defineCommand('debug', {
    help: 'Debug requests',
    action: function(name) {
        this.write('Listening for requests');
        this.displayPrompt();
        server.on('request', (request, socket, head) => {
            this.write(request.method + ' ' +
                'http://' + request.headers['x-forwarded-host'] + request.url + ' HTTP/' +
                request.httpVersion + ' Referrer: ' +
                request.headers.referer + ' User Agent: ' +
                request.headers['user-agent'] + ' IP Address: ' +
                request.headers['x-forwarded-for'] +
                "\n"
            );
            this.displayPrompt();
        });
    }
});

replServer.defineCommand('stopdebug', {
    help: 'Stop debugging requests',
    action: function(name) {
        server.off('request');
        this.write('Debug stopped.'+"\n");
        this.displayPrompt();
    }
});

replServer.defineCommand('start', {
    help: 'Start the server',
    action: function(name) {
        server.listen(port, ip, () => {
            this.write('Listening on port', port, 'on IP', ip+"\n");
            this.displayPrompt();
        });
    }
});

replServer.defineCommand('stop', {
    help: 'Stop the server',
    action: function(name) {
        server.close(() => {
            this.write('Server stopped.'+"\n");
            this.displayPrompt();
        });
    }
});

replServer.defineCommand('restart', {
    help: 'Restart the server',
    action: function(name) {
        server.close(() =>
            server.listen(port, ip, () => {
                this.write('Server restarted. Listening on port', port, 'on IP', ip+"\n")
                this.displayPrompt();
            })
        );
    }
});

replServer.on('exit', () => {
    console.log('^D caught, exiting...');
    server.close(() => process.exit());
})

process.on('SIGINT', () => {
    console.log('SIGINT caught, exiting...');
    server.close(() => process.exit());
});

server.listen(
    port,
    ip,
    () => {
        replServer.write('Listening on port', port, 'on IP', ip+"\n");
        replServer.displayPrompt();
    }
);
