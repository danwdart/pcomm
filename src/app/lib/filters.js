export function requireLogin(req, res, next) {
    if (!req.user)
        return res.status(403).send({error: 'You are not authorised to access this resource.'});
    next();
}