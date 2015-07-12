angular.module('main')
.controller('mainController', mainController);

function mainController($rootScope, $scope) {

  $scope.camaraState = false;
  $scope.control = [[
      {key: 55, label:'-'},
      {key: 56, icon:'glyphicon-triangle-top'},
      {key: 57, label:'-'}
    ], [
      {key: 52, icon:'glyphicon-triangle-left'},
      {key: 53, icon:'glyphicon-ban-circle'},
      {key: 54, icon:'glyphicon-triangle-right'}
    ], [
      {key: 49, label:'-'},
      {key: 50, icon:'glyphicon-triangle-bottom'},
      {key: 51, label:'-'}
    ]
  ];

  EventManager.message(function(message) {
    console.log(message);
  });

  EventManager.streaming(function(data) {
    var strin64Image = data.data;
    $scope.imagedata = strin64Image;
    $rootScope.$apply();
  });

  $scope.generate = function(msg) {
    $scope.data = msg;
  }

  // Camara State
  $scope.changeCameraState = function() {
    if ($scope.camaraState) {
      EventManager.emit.camera.stop();
      $scope.camaraState = false;
    } else {
      EventManager.emit.camera.start();
      $scope.camaraState = true;
    }
  }

  $scope.move = function(btn) {
    if (!btn) {
      throw new Error('there is no btn asociated to this btn');
    };
    KeyMonitor.run(btn.key);
  }

  $scope.buildIcon = function(icon) {
    if (!icon) {
      throw new Error('icon is undefined');
    };
    return 'glyphicon {{0}}'.replace('{{0}}', icon);
  }
}
