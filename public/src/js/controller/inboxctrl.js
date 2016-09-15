export default async function($scope, inbox, $location) {
    $scope.isFolderActive = (id) => id == $location.hash() ||
        ('inbox' == id && '' == $location.hash());

    $scope.toggleselect = (ev, row) => {
        $('[data-id="'+row._id+'"]').toggle(500);
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
