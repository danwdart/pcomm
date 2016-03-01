import {requireLogin} from './filters';
import {
    LoginCtrl,
    RegisterCtrl,
    LogoutCtrl,
    StatusCtrl
} from '../controller/authctrl';
import SettingsCtrl, {
    email as SettingsEmailCtrl,
    deleteNetwork as SettingsDeleteNetworkCtrl
} from '../controller/settingsctrl';
import FeedCtrl from '../controller/feedctrl';
import InboxCtrl, {folders as InboxFoldersCtrl} from '../controller/inboxctrl';

import Facebook from './passport/facebook';
import Twitter from './passport/twitter';
import GNUSocial from './passport/gnusocial';
import Steam from './passport/steam';

export default (app) => {
    app.post('/register', RegisterCtrl);
    app.post('/login', LoginCtrl);
    app.get('/logout', LogoutCtrl);
    app.get('/status', StatusCtrl);
    app.get('/settings', requireLogin, SettingsCtrl);
    app.post('/settings/email', requireLogin, SettingsEmailCtrl);
    app.delete('/settings/network/:id', requireLogin, SettingsDeleteNetworkCtrl);
    app.get('/feed', requireLogin, FeedCtrl);
    app.get('/inbox', requireLogin, InboxCtrl);
    app.get('/inbox/folders', requireLogin, InboxFoldersCtrl);

    let facebook = new Facebook();
    facebook.addRoutesTo(app);

    let twitter = new Twitter();
    twitter.addRoutesTo(app);

    let gnusocial = new GNUSocial();
    gnusocial.addRoutesTo(app);

    let steam = new Steam();
    steam.addRoutesTo(app);
};
