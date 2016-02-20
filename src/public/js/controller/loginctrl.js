export default ($scope, auth, $location, jQuery) => {
    $scope.username = null;
    $scope.password = null;
    $scope.showInvalid = false;
    $scope.showError = false;
    
    $scope.login = async () => {
        let result = auth.login($scope.username, $scope.password);
        
        // This could probably be less ugly
        if (result.isLoggedIn)
            $location.path('/inbox');
        
        if (result.error)
            $scope.showError = true;
        
        if (result.invalid)
            $scope.showInvalid = true;
    };
};