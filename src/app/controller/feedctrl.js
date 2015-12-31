import FacebookNetwork from '../lib/network/facebook';
import TwitterNetwork from '../lib/network/twitter';

// for now it is live but we should save later
export default async (req, res) => {
    let arrFeed = [],
        objFeed,
        networks = req.session.user.networks,
        objNetwork;
    for (let id in networks) {
        let network = networks[id];
        switch(network.type) {
            case 'facebook':
                objNetwork = new FacebookNetwork(
                    network.accessToken,
                    network.refreshToken
                );
                try {
                    objFeed = await objNetwork.getFeed();
                } catch (err) {
                    console.log(err);
                    break;
                }
                for (let item of objFeed) {
                    arrFeed.push(item);
                }
                break;
            case 'twitter':
                objNetwork = new TwitterNetwork(
                    network.accessToken,
                    network.refreshToken
                );
                try {
                    objFeed = await objNetwork.getFeed();
                } catch (err) {
                    console.log(err);
                    break;
                }
                for (let item of objFeed) {
                    arrFeed.push(item);
                }
                break;
            default:
                console.log('do not know what a', network.type, 'is, sorry')
                break;
        }
    }
    
    return res.send(arrFeed);
}