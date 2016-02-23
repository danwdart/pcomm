import config from '../../../config/app';
import passport from 'passport';
import {Strategy as SteamStrategy} from 'passport-steam';
import User from '../model/user';
import {requireLogin} from '../filters';
import md5 from '../md5';

export default class Steam {
    setup(req, res, next) {
        passport.use(new SteamStrategy(
            config.oauth.steam,
            async (identifier, profile, done) => {
                let user = await User.findById(req.session.user._id);
                user.networks = user.networks || {};
                user.networks[md5('steam'+profile.id)] = {
                    type: 'steam',
                    name: profile.displayName,
                    identifier
                };
                try {
                    user.markModified('networks');
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
        app.get('/auth/steam',
        requireLogin,
            this.setup,
            passport.authenticate(
                'steam'
            )
        );

        app.get('/auth/steam/callback',
            requireLogin,
            this.setup,
            passport.authenticate(
                'steam',
                {
                    successRedirect: '/#/settings',
                    failureRedirect: '/#/settings'
                }
            )
        );
    }
}
