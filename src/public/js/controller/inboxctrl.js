export default async ($scope, inbox) => {
    $scope.select = (id) => {
        window.location.hash = '/message/' + id;
    };

    let result = await inbox.getInbox();

    $scope.tableRows = result;
    $scope.$apply();
};
