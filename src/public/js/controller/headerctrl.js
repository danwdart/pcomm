export default async ($scope, isLoggedIn, logout, $location) => {
    $scope.flashsuccess = null;
    $scope.isActive = (viewLocation) => 
        viewLocation === $location.path();
        
    isLoggedIn.onLogin(() => {
        $scope.isLoggedIn = true;
        $scope.$apply();
    });
    
    isLoggedIn.onLogout(() => {
        $scope.isLoggedIn = false;
        $scope.$apply();
    });

    $scope.logout = async () => {
        await logout();
        $scope.isLoggedIn = false;
        $location.hash('/';)
    }
    
    let status = await isLoggedIn();
    $scope.isLoggedIn = status;
    $scope.apply();
};