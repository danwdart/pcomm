import FacebookNetwork from '../lib/network/facebook';
import TwitterNetwork from '../lib/network/twitter';
import EmailNetwork from '../lib/network/email';


// for now it is live but we should save later
export default async (req, res) => {
    let arrInbox = [],
        objInbox,
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
                    objInbox = await objNetwork.getInbox();
                } catch (err) {
                    console.log(err);
                    break;
                }
                for (let item of objInbox) {
                    arrInbox.push(item);
                }
                break;
            case 'twitter':
                objNetwork = new TwitterNetwork(
                    network.accessToken,
                    network.refreshToken
                );
                try {
                    objInbox = await objNetwork.getInbox();
                } catch (err) {
                    console.log(err);
                    break;
                }
                for (let item of objInbox) {
                    arrInbox.push(item);
                }
                break;
            case 'email':
                    objNetwork = new EmailNetwork(network);
                    try {
                        objInbox = await objNetwork.getInbox();
                    } catch (err) {
                        console.log(err);
                        break;
                    }
                    for (let item of objInbox) {
                        arrInbox.push(item);
                    }
                    break;
            default:
                console.log('do not know what a', network.type, 'is, sorry')
                break;
        }
    }

    return res.send(arrInbox);
}
