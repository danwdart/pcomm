export default async ($scope, inbox, $location) => {
    $scope.select = (id) => {
        $('#message'+id).show();
    };

    $scope.compose = () => {
        $('.compose').show(1000);
    }

    $scope.closeCompose = () => {
        $('.compose').hide(1000);
    }

    if ('compose' == $location.hash()) {
        $scope.compose();
    }

    $scope.tableRows = await inbox.getInbox();
    $scope.$apply();

    $scope.folders = await inbox.getFolders();
    $scope.$apply();
};
