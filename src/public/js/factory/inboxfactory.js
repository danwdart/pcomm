export default ($http) => ({
    async getInbox() {
        let result = await $http.get('/inbox');
        return result.data;
    },

    async getFolders() {
        let result = await $http.get('/inbox/folders');
        return result.data;
    }
});
