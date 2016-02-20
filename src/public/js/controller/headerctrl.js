export default async ($scope, isLoggedIn, logout, $location) => {
    $scope.flashsuccess = null;
    $scope.$root.isLoggedIn = false;
    $scope.isActive = (viewLocation) =>
        viewLocation === $location.path();

    $scope.logout = async () => {
        await logout();
        $scope.$root.isLoggedIn = false;
        $scope.$root.$apply();
    }

    let status = await isLoggedIn();
    $scope.$root.isLoggedIn = status;

    $scope.$apply();
    $scope.$root.$apply();
};
