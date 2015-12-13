export default ($scope, $http, $location, jQuery) => {
    $scope.username = null;
    $scope.password = null;
    $scope.password2 = null;

    $scope.showError = false;
    $scope.showPasswordMatchError = false;

    $scope.register = async () => {
        if ($scope.password !== $scope.password2)
            return $scope.showPasswordMatchError = true;

        try {
            let response = await $http.post(
                '/register',
                {
                    username: $scope.username,
                    password: $scope.password
                }
            );
            headerctrl.flashsuccess = 'Successful Registration.'
            $location.path('/');
        } catch (e) {
            $scope.showError = true;
        }
    };
};