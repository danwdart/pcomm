import config from '../../../config/app';
import passport from 'passport';
import {Strategy as TwitterStrategy} from 'passport-twitter';
import User from '../model/user';
import {requireLogin} from '../filters';

export default class Twitter {
    setup(req, res, next) {
        passport.use(new TwitterStrategy(
            config.oauth.twitter,
            async (accessToken, refreshToken, profile, done) => {
                let user = await User.findById(req.session.user._id);
                user.networks = req.session.user.networks || {};
                user.networks[profile.id] = {
                    type: 'twitter',
                    name: profile.displayName,
                    accessToken,
                    refreshToken
                };
                try {
                    await user.save();
                } catch (err) {
                    console.log(err);
                }
                req.session.user = user;
                done(null, {});
            }
        ));
        
        next();
    }

    addRoutesTo(app) {
        app.get('/auth/twitter',
            requireLogin,
            this.setup,
            passport.authenticate(
                'twitter'
            )
        );
        
        app.get('/auth/twitter/callback',
            requireLogin,
            this.setup,
            passport.authenticate(
                'twitter',
                {
                    successRedirect: '/#/settings',
                    failureRedirect: '/#/settings'
                }
            )
        );
    }
}