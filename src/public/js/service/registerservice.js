export default ($http) => {
    return async (username, password) => {
        try {
            let response = await $http.post(
                '/register',
                {
                    username,
                    password
                }
            );
            
            return {success: true};
        } catch (err) {
            return {error: true};
        }
    };
};