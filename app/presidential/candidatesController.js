var myApp = this.angular.module('app');

myApp.controller('candidatesController', function($scope) {
  $scope.selectedRow = null;

  $scope.candidates = [{
    name:'Bernie Sanders',
    party:'Democratic',
    avatar:'./app-content/avatars/presidential/bernie_blue.svg'
  },

  {
    name:'Donald Trump',
    party:'Republican',
    avatar:'./app-content/avatars/presidential/trump_pink.svg'
  },

  {
    name:'Hillary Clinton',
    party:'Democratic',
    avatar:'./app-content/avatars/presidential/hillary_blue.svg'
  },

  {
    name:'John Kasich',
    party:'Republican',
    avatar:'./app-content/avatars/presidential/kasich_pink.svg'
  },
  
  {
    name:'Ted Cruz',
    party:'Republican',
    avatar:'./app-content/avatars/presidential/cruz_pink.svg'
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