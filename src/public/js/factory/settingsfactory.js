export default ($http) => ({
    async getNetworks() {
        try {
            let result = await $http.get('/settings');
            return result.data.networks;
        } catch(err) {
            console.log(err);
            return {};
        }
    },
    async addEmailAccount(data) {
        try {
            let result = await $http.post('/settings/email', data);
            return result.data.networks;
        } catch (err) {
            console.log(err);
        }
    },
    async addXMPPAccount(data) {
        try {
            let result = await $http.post('/settings/xmpp', data);
            return result.data.networks;
        } catch (err) {
            console.log(err);
        }
    },
    async addRSSFeed(data) {
        try {
            let result = await $http.post('/settings/rss', data);
            return result.data.networks;
        } catch (err) {
            console.log(err);
        }
    },
    async deleteNetwork(id) {
        try {
            let result = await $http.delete('/settings/network/'+id);
            return result.data.networks;
        } catch (err) {
            console.log(err);
        }
    }
});
