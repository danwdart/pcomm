import FB from 'fb';
import promisify from 'es6-promisify';
import config from '../../../config/app';
import moment from 'moment';
moment.locale('en-gb');

export default class Facebook {
    constructor(objNetwork) {
        this.objNetwork = objNetwork;
        FB.options({
            appId:          config.oauth.facebook.clientID,
            appSecret:      config.oauth.facebook.clientSecret,
            redirectUri:    config.oauth.facebook.redirectURL
        });
        FB.setAccessToken(objNetwork.accesstoken);
        //FB.setRefreshToken(refreshtoken);
        FB.papi = promisify(FB.api, function(result) {
            if (result.error)
                return this.reject(result);
            return this.resolve(result)
        });
    }

    async getFolders() {
        return [
            {
                name: this.objNetwork.name,
                type: 'facebook'
            }
        ];
    }

    getInbox() {
        return [];
    }

    async getFeed() {
        console.log('getting fb feed')
        try {
            let response = await FB.papi('/me/feed');

            return response.data.map((item) => ({
                from: 'Facebook',
                subject: item.message,
                date: moment(new Date(item.created_time)).format('lll'),
                id: item.id
            }));
        } catch (err) {
            console.log(err);
            return [];
        }
    }

    getLiveMessages() {
    }
}
