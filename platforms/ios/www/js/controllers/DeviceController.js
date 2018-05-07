(function(){
  angular.module('starter')
  .controller('DeviceController', ['$scope', '$state', '$stateParams', 'DeviceFactory', DeviceController]);

  function DeviceController($scope, $state, $stateParams, DeviceFactory){

    var me = this;

    var service_id = '93f809e0-2c1e-11e8-b467-0ed5f89f718b';
    var characteristic_id = '93f81188-2c1e-11e8-b467-0ed5f89f718b';

    me.attendee = {
      firstname: '',
      lastname: ''
    }

    $scope.init = function(){
      $scope.device = DeviceFactory.getDevice($stateParams.id);
    }

    $scope.attend = function(){
      ble.write(
        $stateParams.id,
        service_id,
        characteristic_id,
        btoa(JSON.stringify(me.attendee)),
        function(response){
          if(response == 'OK'){
            alert("Your attendance is recorded!");
            ble.disconnect($stateParams.id);
            $state.go('home');
          }
        },
        function(err){
          alert("Error occured while trying to record your attendance. Please try again.");
        }
      );
     var params = {"value":"V3JpdGUgSGVsbG8gV29ybGQ=","service":service_id,"characteristic":characteristic_id,"type":"noResponse","address":$stateParams.id};
     bluetoothle.write(function(response){
       if(response == 'OK'){
           alert("Your attendance is recorded!");
           ble.disconnect($stateParams.id);
               $state.go('home');
           }
       },
       function(err){
           alert("Error occured while trying to record your attendance. Please try again.");
       }, params);
    }

    $scope.backToHome = function(){
      $state.go('home');
      ble.disconnect($stateParams.id);
    }

  }

})();
