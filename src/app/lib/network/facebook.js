import FB from 'fb';
import promisify from 'es6-promisify';
import config from '../../../config/app';

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
        
    }
    
    async getFeed() {
        let response = await FB.papi('/me/home');
        console.log(response);
        return response.data;
    }
}