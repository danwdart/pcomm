import moment from 'moment';
moment.locale('en-gb');
import FeedParser from 'feedparser';
import request from 'request';

export default class RSS {
    constructor(objNetwork) {
        this.objNetwork = objNetwork;
    }

    async getFolders() {
        return [
            {
                name: this.objNetwork.name,
                type: 'rss'
            }
        ];
    }

    getInbox() {
        return [];
    }

    async getFeed() {
        /*
        let req = request(this.objNetwork.url),
            feedparser = new FeedParser();

        req.on('error', (err) => console.log(err));
        req.on('response', function(res) {
            let stream = this;
            if (200 != res.statusCode) return this.emit('error', new Error('Bad status code'));
            stream.pipe(feedparser);
        });

        feedparser.on('error', (err) => console.log(err));
        feedparser.on('readable', function() {
            let stream = this,
                meta = this.meta,
                item;
            while (item = stream.read()) {

            }
        }
        */
        return [];
    }

    getLiveMessages() {
    }
}
