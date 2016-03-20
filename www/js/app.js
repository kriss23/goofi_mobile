angular.module('goofi', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
  .controller('goofiCtrl', ['$scope', '$window', function($scope, $window){
    $scope.ipCorrect = false;
    $scope.wrongIP = false;

    $scope.link = '#';
    $scope.image ='img/goofy.jpeg';

    $scope.setIP = function(ip){
      $window.msf.remote('http://'+ip+':8001/api/v2/',function(err, service){
        console.log(service);
        $window.app = service.application('xAaLHANm6Q.app','com.goofi.myapp');
        $window.app.connect({name: 'Goofi Mobile'}, function (err) {
          if(err) {
            console.log(err);
            $scope.wrongIP = true;
          }
          else {
            console.log('Goofi has landed!');
            $scope.ipCorrect = true;
          }
          $scope.$apply();
        });
        $window.app.on('say', function(msg, fromClient){
          console.log(fromClient.attributes.name + ' says, ', msg);
          $scope.link = msg.lnk;
          $scope.image = msg.img;
          $scope.$apply();
        });
      });
    }

  }])
