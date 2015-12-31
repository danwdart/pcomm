import FacebookNetwork from '../lib/network/facebook';

// for now it is live but we should save later
export default async (req, res) => {
    let networks = req.session.user.networks;
    for (let id in networks) {
        let network = networks[id];
        switch(network.type) {
            case 'facebook':
                let objNetwork = new FacebookNetwork(
                        network.accessToken,
                        network.refreshToken
                    ),
                    objFeed = await objNetwork.getFeed();
                return res.send(objFeed);
        }
    }
}