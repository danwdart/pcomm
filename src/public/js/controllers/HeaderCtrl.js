export default function($scope, $location)
{
    $scope.isActive = (viewLocation) => 
        viewLocation === $location.path();
};