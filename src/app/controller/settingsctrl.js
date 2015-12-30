import User from '../lib/model/user';

export default async (req, res) => {
    let user = await User.findById(req.session.user._id);
    
    return res.send({networks: user.networks});
}