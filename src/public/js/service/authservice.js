import EventEmitter from 'events';

export default ($http) => 
// todo decorate
class Auth extends EventEmitter {
    
    constructor() {
        this.isLoggedIn = false;
        
        this.on('login', () => {
        });
        
        this.on('logout', () => {
        })
    }
    
    async login(username, password) {
        try {
            let response = await $http.post(
                '/login',
                {
                    username,
                    password
                }
            );
            
            if (204 == response.status) {
                this.processOnLogins();
                return {isLoggedIn: true}
            }
        } catch (err) {
            if (401 == err.status)
                return {invalid: true}
            else
                return {error: true}
        }
    }
    
    async register(username, password) => {
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
    }
    
    async isLoggedIn() {
        let status = await $http.get('/status');
        return status.data;
    }
    
    async logout() {
        try {
            await $http.get('/logout');
        } catch (err) {
            console.log(err);
        }
    }
}