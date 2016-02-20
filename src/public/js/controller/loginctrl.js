export default ($scope, auth, $location, jQuery) => {
    $scope.username = null;
    $scope.password = null;
    $scope.showInvalid = false;
    $scope.showError = false;

    $scope.login = async () => {
        let result = await login($scope.username, $scope.password);
        
        // This could probably be less ugly
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
