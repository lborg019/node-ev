var myApp = this.angular.module('app');

myApp.controller('stateCandidatesController', function($scope) {
  $scope.selectedRow = null;

  $scope.candidates = [{
    name:'Arnold Schwarzenegger',
    party:'Republican',
    avatar:'./app-content/avatars/CA-state/arnold.svg'
  },

  {
    name:'Predator',
    party:'Alien',
    avatar:'./app-content/avatars/CA-state/predator.svg'
  }];

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

});