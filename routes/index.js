var express = require('express');
var router = express.Router();
var coBitId;

/* GET Hello World page. */
router.get('/helloworld', function (req, res) {
    res.render('helloworld', {title: 'Hello, World!'});
});

router.get('/test', function (req, res) {
    res.render('test', {title: 'Hello, World!'});
});

/* GET home page. */
router.get('/new', function (req, res, next) {
    res.render('index', {title: 'CoBit'});
});

router.get('/', function (req, res) {
    res.render("index");
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
                res.redirect("/?coBit=" + doc._id);
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
                res.redirect("/?coBit=" + updateVal);
            }
        });
    }
});

router.get("/:id", function (req, res) {
    var db = req.db;
    var collection = db.get("coBits");

    collection.find({"_id": req.params.id}, {}, function (e, docs) {
        if (e) {
            res.send(e);
        }
        else {
            res.render('index', {coBitData: docs[0]});
        }
    });
});

module.exports = router;