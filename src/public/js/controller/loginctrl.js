export default ($scope, login, $location, jQuery) => {
    $scope.username = null;
    $scope.password = null;
    $scope.showInvalid = false;
    $scope.showError = false;

    $scope.login = async () => {
        let result = await login($scope.username, $scope.password);

        $scope.$root.isLoggedIn = result.isLoggedIn;
        $scope.$root.$apply();

        if (result.isLoggedIn)
            $location.url('/inbox');

        if (result.error)
            $scope.showError = true;

        if (result.invalid)
            $scope.showInvalid = true;

        $scope.$apply();
    };
};
