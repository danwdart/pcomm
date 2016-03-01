export default async ($scope, inbox) => {
    $scope.select = (id) => {
        window.location.hash = '/message/' + id;
    };

    $scope.compose = () => {
        $('.compose').removeClass('hidden').show(1000);
    }

    $scope.closeCompose = () => {
        $('.compose').hide(1000).addClass('hidden');
    }

    let result = await inbox.getInbox();

    $scope.tableRows = result;
    $scope.$apply();
};
