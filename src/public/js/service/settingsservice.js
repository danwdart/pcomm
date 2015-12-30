export default ($http) => {
    return {
        async getNetworks() {
            try {
                let result = await $http.get('/settings');
                return result.data.networks;
            } catch(err) {
                console.log(err);
                return {};
            }
        }
    }
}