export default ($http) => ({
    async getInbox() {
        let result = await $http.get('/inbox');
        return result.data;
    }
});
