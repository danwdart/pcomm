import {requireLogin} from './filters';
import IndexCtrl from '../controllers/IndexCtrl';
import {LoginCtrl, RegisterCtrl, LogoutCtrl, StatusCtrl} from '../controllers/AuthCtrl';

export default (app) => {
    app.post('/register', RegisterCtrl);
    app.post('/login', LoginCtrl);
    app.get('/logout', LogoutCtrl);
    app.get('/status', StatusCtrl);
    app.get('/test', requireLogin, (req, res) => res.send('It works!'));
};
