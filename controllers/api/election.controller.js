var config = require('config.json');
var express = require('express');
var router = express.Router();
var electionService = require('services/election.service');
 
// routes
router.post('/createElection', createElection);
router.get('/getAllElections', getAllElections);
router.put('/:_id', updateElection);
router.delete('/:_id', deleteElection);
router.put('/addVoteCandidate', addVoteCandidate);    
 
module.exports = router;
 
function createElection(req, res) {
    electionService.create(req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}
 
function getAllElections(req, res) {
    electionService.getAll()
        .then(function (election) {
            if (election) {
                res.send(election);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}
 
function updateElection(req, res) {

    electionService.addVote(req.body.electionname, req.body.candidatename)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}
 
function deleteElection(req, res) {
    var electionId = req.election.sub;

    electionService.delete(electionId)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function addVoteCandidate(req, res){
    var candidate = req.candidate;
    //var candidate = "Bernie Sanders"
    console.log(req);

    /*electionService.addVote(candidate)
        .then(function(){
            res.sendStatus(200);
        })
        .catch(function (err){
            res.status(400).send(err);
        });*/
}