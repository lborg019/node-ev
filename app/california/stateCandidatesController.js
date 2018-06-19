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
    //$scope.eName = data[1].electionname;
    //$scope.candidates = data[1].candidates;

    // FIX: instead of hardcoding loop and match:
    flag = 0; // if not found
    var i;
    for (i = 0; i < data.length; i++)
    {
      if (data[i].electionname == "California state election")
      {
        $scope.eName = data[i].electionname;
        $scope.candidates = data[i].candidates;
        flag = 1;
      }
    }
    if (flag == 0)
    {
      console.log("Could not find election data in db")
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
    console.log('Selected a california state candidate');
  });

}]);