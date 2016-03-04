import Email from './email';
import Facebook from './facebook';
import Twitter from './twitter';
import RSS from './rss';
import XMPP from './xmpp';

export default class Abstract {
    static create(objNetwork) {
        let objTypes = {
            email: Email,
            facebook: Facebook,
            twitter: Twitter,
            rss: RSS,
            xmpp: XMPP
        };

        if ('undefined' == typeof objTypes[objNetwork.type])
            throw new Error('Type unknown: ' + objNetwork.type);

        return new objTypes[objNetwork.type](objNetwork);
    }

    static async getFeeds(networks) {
        let arrFeed = [];
        for (let id in networks) {
            let network = networks[id];
            try {
                let objNetwork = this.create(network),
                    objFeed = await objNetwork.getFeed();
                for (let item of objFeed) {
                    arrFeed.push(item);
                }
            } catch (err) {
                console.log(err);
            }
        }
        return arrFeed;
    }

    static async getInbox(networks) {
        let arrInbox = [];

        for (let id in networks) {
            let network = networks[id];
            try {
                let objNetwork = this.create(network),
                    objInbox = await objNetwork.getInbox();
                for (let item of objInbox) {
                    arrInbox.push(item);
                }
            } catch (err) {
                console.log(err);
            }
        }

        return arrInbox;
    }

    static async getFolders(networks) {
        let arrFolders = [];

        for (let id in networks) {
            let network = networks[id];
            try {
                let objNetwork = this.create(network),
                    objFolders = await objNetwork.getFolders();
                for (let item of objFolders) {
                    arrFolders.push(item);
                }
            } catch (err) {
                console.log(err);
            }
        }

        return arrFolders;
    }
}
