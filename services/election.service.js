var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, {
    native_parser: true
});
db.bind('elections');

var service = {};

service.getAll = getAll;
service.create = create;
service.update = update;
service.addVote = addVote;
service.delete = _delete;

module.exports = service;

function getAll() {
    var deferred = Q.defer();

    db.elections.find().toArray(function (err, election) {
        if (err) deferred.reject(err);

        if (election) {
            deferred.resolve(election);
        }
    });

    return deferred.promise;
}

function create(userParam) {
    var deferred = Q.defer();

    // validation
    db.elections.findOne({
            electionname: userParam.electionname
        },
        function (err, election) {
            if (err) deferred.reject(err);

            if (election) {
                // username already exists
                deferred.reject('Election name "' + userParam.electionname + '" is already taken');
            } else {
                createElection();
            }
        });

    function createElection() {
        db.elections.insert(
            election,
            function (err, doc) {
                if (err) deferred.reject(err);

                deferred.resolve();
            });
    }

    return deferred.promise;
}

function update(electionname, candidatename) {
    var deferred = Q.defer();

    // validation
    db.elections.findOne({electionname: userParam}, function (err, election) {
        if (err) deferred.reject(err);

        if (election.electionname !== userParam.electionname) {
            // electionname has changed so check if the new electionname is already taken
            db.elections.findOne({
                    electionname: userParam.electionname
                },
                function (err, election) {
                    if (err) deferred.reject(err);

                    if (election) {
                        // electionname already exists
                        deferred.reject('Election name "' + req.body.username + '" is already taken')
                    } else {
                        updateElection();
                    }
                });
        } else {
            updateElection();
        }
    });

    function updateElection() {
        // fields to update
        var set = {
            electionname: userParam.electionname,
            state: userParam.state,
            candidates: userParam.candidates,
        };

        db.elections.update({
                _id: mongo.helper.toObjectID(_id)
            }, {
                $set: set
            },
            function (err, doc) {
                if (err) deferred.reject(err);

                deferred.resolve();
            });
    }

    return deferred.promise;
}

// prefixed function name with underscore because 'delete' is a reserved word in javascript
function _delete(_id) {
    var deferred = Q.defer();

    db.elections.remove({
            _id: mongo.helper.toObjectID(_id)
        },
        function (err) {
            if (err) deferred.reject(err);

            deferred.resolve();
        });

    return deferred.promise;
}

function addVote(electionname, candidatename){
    var deferred = Q.defer();

    //to fetch candidate by name:
    //db.elections.find({"candidates.name": "Bernie Sanders"}, {_id:0, candidates: {$elemMatch: {name:"Bernie Sanders"}}})
    //or
    //db.elections.aggregate({$match: {"candidates.name":"Donald Trump"}}, {$unwind: "$candidates"}, {$match: {"candidates.name": "Donald Trump"}})

    //add vote to such candidate:
    //db.elections.update({"candidates.name":"Bernie Sanders"}, {$inc: {"candidates.$.votes":+1}})
    
    db.elections.update({ 
            "candidates.name": candidatename
        }, {
            $inc: {"candidates.$.votes":+1}
        },
        function(err, doc) {
            if (err) deferred.reject(err);

            deferred.resolve();

    });

    console.log("We Got here!");

    return deferred.promise;
}