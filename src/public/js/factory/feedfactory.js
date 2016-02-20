export default ($http) => () => ({
    async getFeed() {
        let result = await $http.get('/feed');
        return result.data;
    }
});