export default async ($scope, $http, jQuery) => {
    $scope.username = null;
    $scope.password = null;
    $scope.login = async () => {
        try {
            let response = await $http.post('/login', {
                username: $scope.username,
                password: $scope.password
            });
            
            if (200 == response.status) {
                headerctrl.isLoggedIn = true;
                $location.path('/');
            }
        } catch (err) {
            if (401 == err.status)
                $scope.showInvalid = true;
            else
                $scope.showError = true;
        }
    };
};