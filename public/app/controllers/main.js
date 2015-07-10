angular.module('main')
.controller('mainController', mainController);


function mainController($rootScope, $scope) {
  $scope.name = "lagg";
  remote.socket.on(function(msg) {
    $scope.data = msg;
    console.log(msg);
    // $scope.generate.apply($scope.generate, [msg]);
    // $rootScope.$apply(function() {
    //   $scope.generate.apply(this, [msg]);
    // });
  });

  remote.socket.streaming(function(data) {
    var strin64Image = data.data;
    $scope.imagedata = strin64Image;
    $rootScope.$apply();
  });
  $scope.generate = function(msg) {
    $scope.data = msg;
  }
}