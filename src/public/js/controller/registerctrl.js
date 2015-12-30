export default ($scope, register, $location, jQuery) => {
    $scope.username = null;
    $scope.password = null;
    $scope.password2 = null;

    $scope.showError = false;
    $scope.showPasswordMatchError = false;

    $scope.register = async () => {
        if ($scope.password !== $scope.password2)
            return $scope.showPasswordMatchError = true;

        let result = register($scope.username, $scope.password);
        
        // this could probably be better
        if (result.success) {
            //headerctrl.flashsuccess = 'Successful Registration.'
            $location.path('/');
        }
        
        if (result.error) {
            $scope.showError = true;
        }
    };
};