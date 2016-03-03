export default async ($scope, feed, $location) => {
    $scope.select = (id) => {
        $location.path('/message/' + id);
    };

    $scope.tableRows = await feed.getFeed();
    $scope.$apply();
};
