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
        return await new Promise((res,rej) => {
            let items = [],
                req = request(this.objNetwork.url),
                feedparser = new FeedParser();

            req.on('error', (err) => console.log(err));
            req.on('response', function(res) {
                let stream = this;
                if (200 != res.statusCode) return rej('Status code not 200');
                stream.pipe(feedparser);
            });

            feedparser.on('error', (err) => rej(err));
            feedparser.on('readable', function() {
                let stream = this,
                    meta = this.meta,
                    item;
                while (item = stream.read()) {
                    items.push({
                        from: item.author,
                        subject: item.title,
                        date: moment(new Date(item.date)).format('lll'),
                        id: item.guid,
                        body: item.description,
                        link: item.link
                    });
                }
            });
            feedparser.on('end', () => res(items));
        });
    }

    getLiveMessages() {
    }
}
