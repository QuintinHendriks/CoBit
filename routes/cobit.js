
var express = require('express');
var router = express.Router();

/*
 * GET cobits.
 */

router.get('/', function (req, res) {
   res.redirect('cobit/new');
});

router.get("/new", function(req, res){
    res.render('index.jade');
});

router.get("/:id", function (req, res) {
    var id = req.params.id;
    var db = req.db;
    var collection = db.get("coBits");

    collection.find({"_id": id}, {}, function (e, docs) {
        if (e !== null || docs.length === 0) {
            res.render("404");
        }
        else if(e === null) {
            res.render('index.jade', {coBitData: docs[0]});
        }
    });
});

router.post('/addCoBit', function (req, res) {

    var db = req.db;

    var jsVal = req.body.jsValue;
    var cssVal = req.body.cssValue;
    var htmlVal = req.body.htmlValue;
    var headVal = req.body.settingsValue;
    var titleVal = req.body.titleValue;
    var libsVal = req.body.libsValue;
    var updateVal = req.body.update;
    var userVal = req.body.user;
    var dateVal = req.body.dateValue;

    var collection = db.get('coBits');

    if (updateVal === 'false') {
        collection.insert({
            "js": jsVal,
            "css": cssVal,
            "html": htmlVal,
            "head": headVal,
            "title": titleVal,
            "libraries": libsVal,
            "owner": userVal,
            "date": dateVal
        }, function (err, doc) {
            if (err) {
                // If it failed, return error
                res.send(err);
            }
            else {
                console.log(doc);
                console.log(err);
                // And forward to success page
                res.redirect("../cobit/" + doc._id);
            }
        });
    }
    else if (updateVal !== 'false') {
        collection.update({"_id": updateVal}, {
            $set: {
                "js": jsVal,
                "css": cssVal,
                "html": htmlVal,
                "head": headVal,
                "title": titleVal,
                "libraries": libsVal
            }
        }, function (err, doc) {
            if (err) {
                // If it failed, return error
                res.send(err);
            }
            else {
                console.log(doc);
                // And forward to success page
                res.redirect("../cobit/" + updateVal);
            }
        });
    }
});

module.exports = router;