export default async ($scope, settings, jQuery) => {
    $scope.setupGNUSocial = () => {
        // can't await this as the this was overridden
        swal.withForm({
            title: 'Setup GNU Social Instance',
            text: 'Please enter information about your GNU Social instance',
            showCancelButton: true,
            confirmButtonText: 'Confirm',
            closeOnConfirm: true,
            formFields: [
                {
                    id: 'instance',
                    placeholder: 'Instance URL'
                },
                {
                    id: 'consumerKey',
                    placeholder: 'Consumer Key'
                },
                {
                    id: 'consumerSecret',
                    placeholder: 'Consumer Secret'
                }
            ]
        }, async function(isConfirm) {
            if (!isConfirm) return;
            window.location.href = '/auth/gnusocial?instance='+swalForm.instance+
                '&consumerkey='+swalForm.consumerKey+
                '&consumersecret='+swalForm.consumerSecret
        });
    };
    
    $scope.networks = await settings.getNetworks();
    $scope.$apply();
};