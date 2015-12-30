import config from '../../../config/app';
import passport from 'passport';
import {Strategy as FacebookStrategy} from 'passport-facebook';
import User from '../model/user';
import {requireLogin} from '../filters';

export default class Facebook {
    setup(req, res, next) {
        passport.use(new FacebookStrategy(
            config.oauth.facebook,
            (accessToken, refreshToken, profile, done) => {
                let user = new User(req.session.user);
                user.networks = user.networks || {};
                user.networks[profile.id] = {
                    type: 'facebook',
                    name: profile.displayName,
                    accessToken,
                    refreshToken
                };
                user.save();
                req.session.user = user;
                done(null, {});
            }
        ));
        
        next();
    }

    addRoutesTo(app) {
        app.get('/auth/facebook',
        requireLogin,
            this.setup,
            passport.authenticate(
                'facebook',
                [
                    'read_stream',
                    'publish_actions'
                ]
            )
        );
        
        app.get('/auth/facebook/callback',
            requireLogin,
            this.setup,
            passport.authenticate(
                'facebook',
                {
                    successRedirect: '/#/settings',
                    failureRedirect: '/#/settings'
                }
            )
        );
    }
}