export default ($http) => ({
    async getInbox(folder) {
        let result = await $http.get('/inbox?folder='+folder);
        return result.data;
    },

    async getFolders() {
        let result = await $http.get('/inbox/folders');
        return result.data;
    }
});
