export default async ($scope, isLoggedIn, logout, $location) => {
    $scope.flashsuccess = null;
    $scope.$root.isLoggedIn = false;
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
        $scope.$root.isLoggedIn = false;
        $scope.$root.$apply();
        $location.hash('/');
    }

    let status = await isLoggedIn();
    $scope.$root.isLoggedIn = status;

    $scope.$apply();
    $scope.$root.$apply();
};