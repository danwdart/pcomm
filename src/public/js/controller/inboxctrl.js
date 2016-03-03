export default async ($scope, inbox, $location) => {
    $scope.isFolderActive = (id) => id == $location.hash() ||
        ('inbox' == id && '' == $location.hash());

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

    $scope.folders = await inbox.getFolders();
    $scope.$apply();

    $scope.tableRows = await inbox.getInbox($location.hash());
    $scope.$apply();
};
