import config from '../../../config/app';
import passport from 'passport';
import {Strategy as FacebookStrategy} from 'passport-facebook';
import User from '../model/user';
import {requireLogin} from '../filters';

export default class Facebook {
    setup(req, res, next) {
        passport.use(new FacebookStrategy(
            config.oauth.facebook,
            async (accessToken, refreshToken, profile, done) => {
                let user = await User.findById(req.session.user._id);
                user.networks = user.networks || {};
                user.networks[profile.id] = {
                    type: 'facebook',
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
        app.get('/auth/facebook',
        requireLogin,
            this.setup,
            passport.authenticate(
                'facebook',
                {
                    scope: [
                        'publish_actions',
                        'user_posts'
                    ]
                }
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