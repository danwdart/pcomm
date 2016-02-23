export default async ($scope, feed) => {
    $scope.select = (id) => {
        window.location.hash = '/message/' + id;
    };

    let result = await feed.getFeed();

    $scope.tableRows = result;
    $scope.$apply();
};
