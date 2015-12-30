export default ($scope, login, $location, jQuery) => {
    $scope.username = null;
    $scope.password = null;
    $scope.showInvalid = false;
    $scope.showError = false;
    
    $scope.login = async () => {
        let result = login($scope.username, $scope.password);
        
        // This could probably be less ugly
        if (result.isLoggedIn)
            $location.path('/inbox');
        
        if (result.error)
            $scope.showError = true;
        
        if (result.invalid)
            $scope.showInvalid = true;
    };
};