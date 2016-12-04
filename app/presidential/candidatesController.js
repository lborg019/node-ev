var myApp = this.angular.module('app');

myApp.controller('candidatesController', ['$scope', 'ElectionService', function($scope, electionService) {
  $scope.selectedRow = null;
  
  $scope.eName = null;
  $scope.candidates = null;

  electionService.GetAll().then(function(data) {
    
    //hardcoded data[0] means presidential elections
    $scope.eName = data[0].electionname;
    $scope.candidates = data[0].candidates;
  });

  $scope.setClickedRow = function(index){
    $scope.selectedRow = index;
  }

  $scope.clearRow = function(){
    $scope.selectedRow = null;
    //console.log('Cleared candidate selection');
  }

  $scope.confirm = function(){
    if($scope.selectedRow==null){ 
      console.log('Confirmed a null vote');
    }
    else
    {
      console.log('Confirmed a vote for '+$scope.selectedRow);
    }
  }

  $scope.$watch('selectedRow', function(){
    console.log('Selected a candidate');
  });

}]);