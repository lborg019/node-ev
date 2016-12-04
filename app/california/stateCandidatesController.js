var myApp = this.angular.module('app');

myApp.controller('stateCandidatesController', ['$scope', 'ElectionService', function($scope, electionService) {
  $scope.selectedRow = null;

  $scope.eName = null;
  $scope.candidates = null;

  electionService.GetAll().then(function(data){

    //hardcoded: data[1] means california elections
    $scope.eName = data[1].electionname;
    $scope.candidates = data[1].candidates;
  })

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