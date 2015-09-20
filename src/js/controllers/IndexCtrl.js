export default function($scope)
{
    $scope.sample = 'sample';

    let sample = new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve('hi');
        });
    });

    async () => {
        let that = await sample();
        console.log(that);
    }
};