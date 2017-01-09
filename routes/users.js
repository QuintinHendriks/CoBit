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
    var collection2 = db.get("coBits");
    collection.find({"username": req.params.id}, {}, function (e, docs) {
        if (e) {
            res.send(e);
        }
        else {
            console.log(docs[0]);
            collection2.find({"owner": req.params.id}, {_id: 1, owner: 1}, function (e2, docs2) {
                console.log(docs2[0]);
                if (e2) {
                    res.send(e2);
                }
                else {
                    if (sess.username) {
                        res.render('test', {userData: docs[0], loginData: sess.username, coBitData: docs2});
                    }
                    else {
                        res.render('test', {userData: docs[0], coBitData: docs2, loginData: false});
                    }
                }
            });
        }
    });
});

module.exports = router;