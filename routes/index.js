var express = require('express');
var router = express.Router();
var session = require('express-session');

/* GET Hello World page. */
router.get('/helloworld', function(req, res) {
    res.render('helloworld', {
        title: 'Hello, World!'
    });
});

router.get('/test', function(req, res) {
    res.render('test', {
        title: 'Hello, World!'
    });
});

var sess;
router.get("/", function(req, res) {
    sess = req.session;
    var db = req.db;
    var collection = db.get("coBits");

    collection.find({}, {
        "_id": 1
    }, function(e, docs) {
        if (e) {
            res.render("404");
        }
        else if (e === null) {
            if (sess.username) {
                res.render('home', {
                    loginData: sess.username,
                    coBitData: docs
                });
                console.log(sess.username);
            }
            else {
                res.render('home', {
                    loginData: false,
                    coBitData: docs
                });
            }
        }
    });
});

module.exports = router;
