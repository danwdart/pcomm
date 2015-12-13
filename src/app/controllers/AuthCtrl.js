import User from '../lib/Model/User';
import passwordhash from 'password-hash';

export async function LoginCtrl(req, res) {
    let user = await User.findOne({username: req.post.username});

    if (!user)
        return res.status(401).send({error: 'Invalid Credentials'});

    if (!passwordhash.verify(req.post.password, user.password)) 
        return res.status(401).send({error: 'Invalid Cdedentials'});
    
    req.session.user = user;

    return res.status(204);
};

export async function RegisterCtrl(req, res) {
    let user = await User.findOne({username: req.post.username});
    
    if (user)
        return res.status(400).send({error:'User exists'});
    
    user = new User();
    user.username = req.post.username;
    user.password = passwordhash.generate(
        req.post.password,
        {
            algorithm: 'sha512'
        }
    );

    try {
        await user.save();
    } catch(err) {
        return res.status(500).send({error: 'Error saving new user'});
    }

    return res.status(201);
};

export function LogoutCtrl(req, res) {
    req.session.reset();
    return res.status(204);
};

export function StatusCtrl(req, res) {
    if ('undefined' !== typeof req.session.user)
        return res.send(true);
    return res.send(false);
};