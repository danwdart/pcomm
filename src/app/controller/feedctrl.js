import AbstractNetwork from '../lib/network/abstract';

export default async (req, res) => {
    let networks = req.session.user.networks,
        arrFeed = await AbstractNetwork.getFeeds(networks);
    console.log(arrFeed)

    return res.send(arrFeed);
}
