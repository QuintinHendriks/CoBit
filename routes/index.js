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
router.get('/', function (req, res, next) {
    res.render('index', {title: 'CoBit'});
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
    var dateval = req.body.dateValue;

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
                res.send("Not Today");
            }
            else {
                console.log(doc);
                // And forward to success page
                res.redirect("/?coBit=" + doc._id);
            }
        });
    }
    else if(updateVal !== 'false'){
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

router.post('/addCoBit/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('coBits');
    var cobitToUpdate = req.params.id;
    collection.update(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

router.post("/test/:id", function(req, res){
    var db = req.db;
    var collection = db.get('coBits');
    collection.find({"_id": req.params.id},{},function(e,docs){
        res.json(docs);
    });
});

module.exports = router;