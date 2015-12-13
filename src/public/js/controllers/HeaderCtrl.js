export default async ($scope, $location, $http) => {
    $scope.isActive = (viewLocation) => 
        viewLocation === $location.path();

    let status = await $http.get('/status');
    $scope.isLoggedIn = status.data;

    $scope.logout = async () => {
        try {
            await $http.get('/logout');
            $scope.isLoggedIn = false;
        } catch (err) {
            console.log(err);
        }
    };
};