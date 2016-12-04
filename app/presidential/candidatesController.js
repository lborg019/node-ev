var myApp = this.angular.module('app');

myApp.controller('candidatesController', ['$scope', 'ElectionService', function($scope, electionService) {
  $scope.selectedRow = null;
  $scope.temp = null;
  $scope.eName = null;
  $scope.candidates = null;

  electionService.GetAll().then(function(data) {
    
    //hardcoded data[0] means presidential elections
    $scope.temp = data;
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
      //pass this message to the front end
    }
    else
    {
      var confirmedCandidate = $scope.candidates[$scope.selectedRow].name;
      //console.log('Confirmed: '+confirmedCandidate);
      console.log('Election', $scope.temp)
      var matchingCandidate = null;
      electionService.AddVote(confirmedCandidate).then(function(ret){
        //ret will work as check
      });
    }
  }

  $scope.$watch('selectedRow', function(){
    console.log('Selected a candidate');
  });

}]);