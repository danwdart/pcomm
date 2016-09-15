export default async function($scope, isLoggedIn, logout, $location) {
    $scope.$root.flash = {};
    $scope.$root.status = {
        isLoggedIn: false
    };

    $scope.isActive = (viewLocation) => viewLocation === $location.path();

    $scope.logout = async () => {
        await logout();
        $scope.$root.status.isLoggedIn = false;
        $scope.$root.$apply();
        $location.path('/');
    }

    $scope.search = (searchterm) => {
        $location.path('search?q='+searchterm);
    }

    $scope.$root.status = await isLoggedIn();

    $scope.$apply();
    $scope.$root.$apply();
};
