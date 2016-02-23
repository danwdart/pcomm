export default async ($scope, settings, jQuery) => {
    $scope.setupGNUSocial = async () => {
        let context = await swal.withFormAsync(
            {
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
            }
        );

        if (!context.isConfirm) return;
        window.location.href = '/auth/gnusocial?instance='+this.swalForm.instance+
            '&consumerkey='+context.swalForm.consumerKey+
            '&consumersecret='+context.swalForm.consumerSecret;
    };

    $scope.setupEmail = async () => {
        let context = await swal.withFormAsync(
            {
                title: 'Setup Email',
                text: 'Please enter information about your email server',
                showCancelButton: true,
                confirmButtonText: 'Confirm',
                closeOnConfirm: true,
                formFields: [
                    {
                        id: 'emailaddress',
                        placeholder: 'Email Address'
                    },
                    {
                        id: 'password',
                        placeholder: 'Password',
                        type: 'password'
                    },
                    {
                        id: 'imap',
                        placeholder: 'IMAP hostname'
                    },
                    {
                        id: 'smtp',
                        placeholder: 'SMTP hostname'
                    }
                ]
            }
        );

        if (!context._isConfirm) return;
        $scope.networks = await settings.addEmailAccount(context.swalForm);
        $scope.$apply();
    };

    $scope.delete = (id) => {
        swal(
            {
                title: 'Really delete?',
                text: 'Really delete this account?',
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete',
                closeOnConfirm: true
            },
            async function(isConfirm) {
                if (!isConfirm) return;

                $scope.networks = await settings.deleteNetwork(id);
                $scope.$apply();
            }
        )
    };

    $scope.networks = await settings.getNetworks();
    $scope.$apply();
};
