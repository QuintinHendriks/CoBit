/**
 * Created by Quintin on 29-12-2016.
 */
var express = require('express');
var router = express.Router();
var session = require("express-session");

router.get("/usercheck/:uname", function (req, res){
    var db = req.db;
    var collection = db.get('users');
    collection.find({"username": req.params.uname}, {}, function (e, docs) {
        if(docs[0]){
            res.json([{result: true}]);
        }
        else{
            res.json([{result: false}]);
        }
    });
});

router.get("/mailcheck/:email", function (req, res){
    var db = req.db;
    var collection = db.get('users');
    collection.find({"email": req.params.email}, {}, function (e, docs) {
        if(docs[0]){
            res.json([{result: true}]);
        }
        else{
            res.json([{result: false}]);
        }
    });
});

var sess;
router.get("/:id", function (req, res) {
    sess = req.session;

    var db = req.db;
    var collection = db.get('users');
    var collection2 = db.get("coBits");
    collection.find({"username": req.params.id}, {}, function (e, docs) {
        if (e) {
            res.send(e);
        }
        else if(docs.length === 0){
            res.render("404");
        }
        else {
            console.log(docs[0]);
            var result2 = [];
            docs.forEach(function(document){
                result2.push({username: document.username, id: document._id});
            });
            collection2.find({"owner": req.params.id}, {sort: {"date": -1}}, function (e2, docs2) {
                console.log(docs2[0]);
                if (e2) {
                    res.send(e2);
                }
                else {
                    var result = [];
                    docs2.forEach(function(document){
                        result.push({id: document._id, title: document.title, owner: document.owner});
                    });
                    if (sess.username) {
                        res.render('test', {userData: result2, loginData: sess.username, coBitData: result});
                    }
                    else {
                        res.render('test', {userData: result2, coBitData: result, loginData: false});
                    }
                }
            });
        }
    });
});

module.exports = router;