angular.module('main')
.controller('mainController', mainController);

console.log(SocketManager);

function mainController($rootScope, $scope) {

  $scope.control = [
    [
      {key: 55, label:'-'},
      {key: 56, icon:'glyphicon-triangle-top'},
      {key: 57, label:'-'}
    ],
    [
      {key: 52, icon:'glyphicon-triangle-left'},
      {key: 53, icon:'glyphicon-ban-circle'},
      {key: 54, icon:'glyphicon-triangle-right'}
    ],
    [
      {key: 49, label:'-'},
      {key: 50, icon:'glyphicon-triangle-bottom'},
      {key: 51, label:'-'}
    ]
  ]

  $scope.name = "lagg";
  SocketManager.on(function(message) {
    $scope.data = message;
    console.log(message);
    // $scope.generate.apply($scope.generate, [msg]);
    // $rootScope.$apply(function() {
    //   $scope.generate.apply(this, [msg]);
    // });
  });

  SocketManager.streaming(function(data) {
    var strin64Image = data.data;
    $scope.imagedata = strin64Image;
    $rootScope.$apply();
  });

  $scope.generate = function(msg) {
    $scope.data = msg;
  }

  $scope.startStreaming = function() {
    console.log('Start streaming');
  }

  $scope.move = function(btn) {
    if (!btn) {
      throw new Error('there is no btn asociated to this btn');
    };
    remote.move(btn.key);
  }

  $scope.buildIcon = function(icon) {
    if (!icon) {
      throw new Error('icon is undefined');
    };
    return 'glyphicon {{0}}'.replace('{{0}}', icon);
  }
}
