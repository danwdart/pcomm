export default async function($scope, feed, $location) {
    $scope.select = (id) => {
        $location.path('/message/' + id);
    };

    $scope.tableRows = await feed.getFeed();
    $scope.$apply();
};
