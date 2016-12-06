(function () {
    'use strict';
 
    angular
        .module('app')
        .factory('ElectionService', electionService);
 
    function electionService($http, $q) {
        var election = {};
 
        election.GetCurrent = GetCurrent;
        election.GetAll = GetAll;
        election.GetById = GetById;
        election.AddVote = AddVote;
        election.GetByElectionName = GetByElectionName;
        election.Create = Create;
        election.Update = Update;
        election.Delete = Delete;
 
        return election;
 
        function GetCurrent() {
            return $http.get('/api/elections/current').then(handleSuccess, handleError);
        }
 
        function GetAll() {
            return $http.get('/api/elections/getAllElections').then(handleSuccess, handleError);
        }
 
        function GetById(_id) {
            return $http.get('/api/elections/' + _id).then(handleSuccess, handleError);
        }

        function AddVote(candidate){
            //console.log('addVote('+ candidate+')');
            return $http.put('/api/elections/addVoteCandidate', {electionname: "2016 presidential elections", candidatename: candidate}).then(handleSuccess, handleError);
        }
 
        function GetByElectionName(electionname) {
            return $http.get('/api/elections/' + electionname).then(handleSuccess, handleError);
        }
 
        function Create(election) {
            return $http.post('/api/elections', election).then(handleSuccess, handleError);
        }
 
        function Update(election) {
            return $http.put('/api/elections/' + election._id, election).then(handleSuccess, handleError);
        }
 
        function Delete(_id) {
            return $http.delete('/api/elections/' + _id).then(handleSuccess, handleError);
        }
 
        // private functions
 
        function handleSuccess(res) {
            //console.log(res);
            return res.data;
        }
 
        function handleError(res) {
            return $q.reject(res.data);
        }
    }
 
})();