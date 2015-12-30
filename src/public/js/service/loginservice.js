export default ($http) => {
    return async(username, password) => {
        try {
            let response = await $http.post(
                '/login',
                {
                    username,
                    password
                }
            );
            
            if (204 == response.status) {
                return {isLoggedIn: true}
            }
        } catch (err) {
            if (401 == err.status)
                return {invalid: true}
            else
                return {error: true}
        }
    };
};