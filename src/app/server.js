import 'babel/polyfill';
import express from 'express';
import config from '../config/app.json';
import routes from './lib/routes';

let app = express(),
    port = ('undefined' !== process.env['PORT'])?
        config.port:
        process.env['PORT'];

routes(app);

app.use(express.static(__dirname + '/../public'));


let server = app.listen(
    port,
    () => console.log('Listening on port ' + port)
);
