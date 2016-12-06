var myApp = this.angular.module('app');

myApp.controller('stateCandidatesController', ['$scope', 'ElectionService', 'UserService', function($scope, electionService, UserService) {
  //front end variables
  $scope.voted;
  $scope.loaded;
  $scope.user;
  $scope.selectedRow = null;

  //back end variables
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
      electionService.AddVote(confirmedCandidate, $scope.eName).then(function(ret){
        console.log(ret)
      });

      $scope.voted = true;
      if($scope.user._id){
        //change the state of the user who voted (block user from voting again)
        console.log($scope.user._id)
        UserService.Vote($scope.user._id, $scope.eName).then(function(ret){
          console.log(ret)
        });
      }
    }
  }

  $scope.$watch('selectedRow', function(){
    console.log('Selected a candidate');
  });

}]);