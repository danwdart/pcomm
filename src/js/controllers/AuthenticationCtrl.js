export default function($scope, Facebook)
{
    $scope.loginStatus = 'disconnected';
    $scope.facebookIsReady = false;
    $scope.user = null;

    $scope.login = function () {
      Facebook.login(function(response) {
        $scope.loginStatus = response.status;
      }, {scope: 'user_posts,publish_actions'});
    };

    $scope.removeAuth = function () {
      Facebook.logout(function() {
        console.log('logged out')
        Facebook.getLoginStatus(function(response) {
          console.log(response)
          $scope.loginStatus = response.status;
        });
      });
    };

    $scope.api = function () {
      Facebook.api('/me',   function(user) {
        $scope.user = user;
      });
    };

    $scope.messages = function() {
      Facebook.api('/me/inbox', function(messages) {
        console.log(messages)
        $scope.messages = messages;
      })
    }

    $scope.feed = function() {
      Facebook.api('/me/feed', function(feed) {
        console.log(feed);
        $scope.feed = feed;
      })
    }

    $scope.$watch(function() {
        return Facebook.isReady();
      }, function(newVal) {
        if (newVal) {
          $scope.facebookIsReady = true;
        }
      }
    );
}