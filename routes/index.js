var express = require('express');
var router = express.Router();
var session = require('express-session');

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

    collection.find({}, {sort: {"date": -1}}, function(e, docs) {
        if (e) {
            res.render("404");
        }
        else if (e === null) {
            var result = [];
            docs.forEach(function(element){
                result.push({id: element._id, title: element.title, owner: element.owner, likes: element.likes, date: element.date});
            });
            if (sess.username) {
                res.render('home', {
                    loginData: sess.username,
                    coBitData: result
                });
                console.log(sess.username);
            }
            else {
                res.render('home', {
                    loginData: false,
                    coBitData: result
                });
            }
        }
    });
});

module.exports = router;
