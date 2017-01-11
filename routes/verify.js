/**
 * Created by Quintin on 11-1-2017.
 */

var express = require('express');
var router = express.Router();
var session = require('express-session');

router.get("/:id", function (req, res) {
    var db = req.db;
    var collection = db.get('verification');
    var collection2 = db.get('users');
    collection.find({"_id": req.params.id}, {}, function (err, docs) {
        if (err) {
            return console.log(err);
        }
        else {
            console.log(docs);
            collection2.update({"_id": docs[0].user}, {
                $set: {
                    "verified": true
                }
            }, function (err2, docs2) {
                if (err2) {
                    res.send(err2);
                }
                else {
                    console.log(docs2);
                    res.redirect("../login?verify=true");
                }
            });
        }
    });
});

module.exports = router;