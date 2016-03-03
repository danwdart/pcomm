import Feed from '../lib/model/feed';

export default async (req, res) => {
    let arrFeed = await Feed.find({user: req.session.user.username});

    return res.send(arrFeed);
}
