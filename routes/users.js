/**
 * Created by Quintin on 29-12-2016.
 */
var express = require('express');
var router = express.Router();
var session = require("express-session");

router.get("/userlist", function (req, res) {
    var db = req.db;
    var collection = db.get('users');
    collection.find({}, {}, function (e, docs) {
        res.json(docs);
    });
});

var sess;
router.get("/:id", function (req, res) {
    sess = req.session;

    var db = req.db;
    var collection = db.get('users');
    collection.find({"username": req.params.id}, {}, function (e, docs) {
        if (e) {
            res.send(e);
        }
        else {
            if (sess.username) {
                res.render('test', {userData: docs[0], loginData: sess.username});
            }
            else {
                res.render('test', {userData: docs[0]});
            }
        }
    });
});

module.exports = router;