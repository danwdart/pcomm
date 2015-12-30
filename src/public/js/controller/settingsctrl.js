export default async ($scope, settings, jQuery) => {
    $scope.networks = await settings.getNetworks();
    $scope.$apply();
};