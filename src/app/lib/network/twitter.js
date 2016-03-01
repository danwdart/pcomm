import TwitterAPI from 'twitter';
import promisify from 'es6-promisify';
import config from '../../../config/app';
import moment from 'moment';
moment.locale('en-gb');

export default class Twitter {
    constructor(accesstoken, refreshtoken) {
        this._client = new TwitterAPI({
            consumer_key: config.oauth.twitter.consumerKey,
            consumer_secret: config.oauth.twitter.consumerSecret,
            access_token_key: accesstoken,
            access_token_secret: refreshtoken
        });

        this._client.pget = promisify(this._client.get, function(err, result, response) {
            if (err)
                return this.reject(err);
            return this.resolve(result[0]);
        });
    }

    getInbox() {
        return [];
    }

    async getFeed() {
        try {
            let result = await this._client.pget('statuses/home_timeline');
            return result.map((item) => ({
                id: item.id,
                from: (item.user)?item.user.name + ' (@' + item.user.screen_name + ')':'Twitter',
                date: moment(new Date(item.created_at)).format('lll'),
                subject: item.text
            }));
        } catch (err) {
            console.log(err);
            return [];
        }
    }
}
