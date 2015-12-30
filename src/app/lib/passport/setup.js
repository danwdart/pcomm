import passport from 'passport';

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

export default function setup(app) {
    app.use(passport.initialize());
    app.use(passport.session());
}