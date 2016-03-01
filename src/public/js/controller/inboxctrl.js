export default async ($scope, inbox, $location) => {
    $scope.select = (id) => {
        $location.path('/message/' + id);
    };

    $scope.compose = () => {
        $('.compose').removeClass('hidden').show(1000);
    }

    $scope.closeCompose = () => {
        $('.compose').hide(1000).addClass('hidden');
    }

    if ('compose' == $location.hash()) {
        $scope.compose();
    }

    let result = await inbox.getInbox();

    $scope.tableRows = result;
    $scope.$apply();
};
