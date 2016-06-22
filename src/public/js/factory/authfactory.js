export function LoginFactory($http) {
    return async (username, password) => {
        try {
            let response = await $http.post(
                '/login',
                {
                    username,
                    password
                }
            );

            if (204 == response.status) {
                return {
                    isLoggedIn: true,
                    username
                }
            }
        } catch (err) {
            if (401 == err.status)
                return {invalid: true}
            else
                return {error: true}
        }
    };
};

export function RegisterFactory($http) {
    return async (username, password) => {
        try {
            let response = await $http.post(
                '/register',
                {
                    username,
                    password
                }
            );

            return {
                success: true,
                username
            };
        } catch (err) {
            return {error: true};
        }
    };
};

export function isLoggedInFactory($http) {
    return async () => {
        let status = await $http.get('/status');
        return status.data;
    };
}

export function LogoutFactory($http) {
    return async () => {
        try {
            await $http.get('/logout');
        } catch (err) {
            console.log(err);
        }
    };
}
