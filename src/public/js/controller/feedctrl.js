export default async ($scope, feed, $location) => {
    $scope.select = (id) => {
        $location.path('/message/' + id);
    };

    let result = await feed.getFeed();

    $scope.tableRows = result;
    $scope.$apply();
};
