var myVote = this.angular.module('app');

myVote.controller('voteController', ['$scope', 'ElectionService', function($scope, electionService) {
  
  $scope.selectedRow = null;

  $scope.array = [];

  electionService.GetAll().then(function(data) {
    //$scope.test = data;
    for (var i = 0; i < data.length; i++)
    {
      $scope.array.push(data[i]);
      //console.log(data[i].route)
    }

    //election1 = data[0].electionname;
    //election2 = data[1].electionname;
  });
}]);