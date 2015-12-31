export default ($http) => async () => {
    let result = await $http.get('/feed');
    return result.data;
}