import {requireLogin} from './filters';
import {LoginCtrl, RegisterCtrl, LogoutCtrl, StatusCtrl} from '../controller/authctrl';

import Facebook from './passport/facebook';
import Twitter from './passport/twitter';

export default (app) => {
    app.post('/register', RegisterCtrl);
    app.post('/login', LoginCtrl);
    app.get('/logout', LogoutCtrl);
    app.get('/status', StatusCtrl);
    app.get('/test', requireLogin, (req, res) => res.send('It works!'));
    
    let facebook = new Facebook();
    facebook.addRoutesTo(app);
    
    let twitter = new Twitter();
    twitter.addRoutesTo(app);
};
