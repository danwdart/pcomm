import FB from 'fb';
import promisify from 'es6-promisify';
import config from '../../../config/app';
import moment from 'moment';
moment.locale('en-gb');

export default class Facebook {
    constructor(accesstoken, refreshtoken) {
        FB.options({
            appId:          config.oauth.facebook.clientID,
            appSecret:      config.oauth.facebook.clientSecret,
            redirectUri:    config.oauth.facebook.redirectURL
        });
        FB.setAccessToken(accesstoken);
        //FB.setRefreshToken(refreshtoken);
        FB.papi = promisify(FB.api, function(result) {
            return this.resolve(result)
        });
    }

    getInbox() {
        return [];
    }

    async getFeed() {
        let response = await FB.papi('/me/feed');

        return response.data.map((item) => ({
            from: 'Facebook',
            subject: item.message,
            date: moment(new Date(item.created_time)).format('lll'),
            id: item.id
        }));
    }
}
