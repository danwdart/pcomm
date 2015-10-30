export default function($scope, jQuery)
{
    $scope.sample = 'sample';

    $scope.select = (id) => {
        window.location.hash = '/message/' + id
    };

    $scope.tableRows = [
        {
            id: 1,
            from: 'Bob Dobbs',
            subject: 'Hello',
            date: '2015-10-01 00:00:00'
        },
        {
            id: 2,
            from: 'Bob Dobbs',
            subject: 'Hello',
            date: '2015-10-01 00:00:00'
        },
        {
            id: 3,
            from: 'Bob Dobbs',
            subject: 'Hello',
            date: '2015-10-01 00:00:00'
        }
    ];

    let sample = () => new Promise((resolve,reject) => 
        setTimeout(() => resolve('hi'), 1000)
    );

    async () => {
        let that = await sample();
        console.log(that);
    }();
};