import config from '../../../config/app';
import passport from 'passport';
import {Strategy as GNUSocialStrategy} from 'passport-statusnet';
import User from '../model/user';
import {requireLogin} from '../filters';
import md5 from '../md5';

export default class GNUSocial {
    setup(req, res, next) {
        passport.use(new GNUSocialStrategy(
            {
                statusnet: req.query.instance,
                consumerKey: req.query.consumerkey,
                consumerSecret: req.query.consumersecret,
                callbackURL: config.oauth.gnusocial.callbackURL
            },
            async (accessToken, refreshToken, profile, done) => {
                let user = await User.findById(req.session.user._id);
                user.networks = user.networks || {};
                user.networks[md5('gnusocial'+req.query.instance+profile.id)] = {
                    type: 'gnusocial',
                    name: profile.displayName,
                    statusnet: req.query.instance,
                    consumerKey: req.query.consumerkey,
                    consumerSecret: req.query.consumersecret,
                    callbackURL: config.oauth.gnusocial.callbackURL,
                    accessToken,
                    refreshToken
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
        app.post('/auth/gnusocial',
            requireLogin,
            this.setup,
            (req, res) => {
                return passport.authenticate(
                    'gnusocial'
                )
            }
        );

        app.get('/auth/gnusocial/callback',
            requireLogin,
            this.setup,
            passport.authenticate(
                'gnusocial',
                {
                    successRedirect: '/#/settings',
                    failureRedirect: '/#/settings'
                }
            )
        );
    }
}
