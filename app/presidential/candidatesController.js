var myApp = this.angular.module('app');

myApp.controller('candidatesController', ['$scope', 'ElectionService', 'UserService', function($scope, electionService, UserService) {
  //$scope.selectedRow = null;
  $scope.voted;
  $scope.loaded;
  $scope.user;
  $scope.selectedRow = null;
  $scope.eName = null;
  $scope.candidates = null;
  
  initController();

  function initController(){
    //get current user
    UserService.GetCurrent().then(function (user){
      $scope.user = user;
      $scope.voted = user.voted;
      $scope.loaded = true;
    });
  }

  electionService.GetAll().then(function(data) {
    
    //hardcoded data[0] means presidential elections
    //$scope.eName = data[0].electionname;
    //$scope.candidates = data[0].candidates;

    flag = 0; // if not found
    var i;
    for (i = 0; i < data.length; i++)
    {
      if (data[i].electionname == "Presidential election")
      {
        $scope.eName = data[i].electionname;
        $scope.candidates = data[i].candidates;
        flag = 1;
      }
      if(flag == 0)
      {
        console.log("Could not find election data in db")
      }
    }
  })

  $scope.setClickedRow = function(index){
    $scope.selectedRow = index;
  }

  $scope.clearRow = function(){
    $scope.selectedRow = null;
  }

  $scope.confirm = function(){
    if($scope.selectedRow==null){ 
      //console.log('Confirmed a null vote');
      //pass this message to the front end
    }
    else
    {
      //increase candidate vote count in election collection
      var confirmedCandidate = $scope.candidates[$scope.selectedRow].name;
      //electionService.AddVote(confirmedCandidate).then(function(ret){
      electionService.AddVote(confirmedCandidate, $scope.eName).then(function(ret){
        console.log(ret)
      });

      $scope.voted = true;
      if($scope.user._id){
        //change the state of the user who voted (block user from voting again)
        UserService.Vote($scope.user._id, $scope.eName).then(function(ret){
          console.log(ret)
        });
      }
    }
  }

  $scope.$watch('selectedRow', function(){
    console.log('Selected a presidential candidate');
  });

}]);