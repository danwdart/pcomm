export default async ($scope, isLoggedIn, logout, $location) => {
    $scope.flashsuccess = null;
    $scope.isActive = (viewLocation) => 
        viewLocation === $location.path();

    $scope.logout = async () => {
        await logout();
        $scope.isLoggedIn = false;
    }
    
    let status = await isLoggedIn();
    $scope.isLoggedIn = status;
};