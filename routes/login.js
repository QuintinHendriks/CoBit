/**
 * Created by Quintin on 28-12-2016.
 */
var express = require('express');
var router = express.Router();
var session = require('express-session');

//function for hashing passwords
String.prototype.hashCode = function () {
    var hash = 0, i, chr, len;
    if (this.length === 0) return hash;
    for (i = 0, len = this.length; i < len; i++) {
        chr = this.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0;
    }
    return hash;
};

var sess;
router.get('/', function(req, res){
    sess = req.session;

    if(sess.username){
        res.render('login', {loginData: sess.username});
    }
    else{
        res.render('login');
    }
});


router.post('/loginuser', function (req, res, next) {
    var db = req.db;

    var uname = req.body.uName;
    var pWord = req.body.passWord;
    var pwvalue = pWord.hashCode();
    var collection = db.get("users");

    collection.find({"username": uname}, {}, function (e, docs) {
        if(docs) {
            if (docs[0].password === pwvalue) {
                sess = req.session;

                sess.username = docs[0].username;

                if (sess.username) {
                    res.redirect("../users/" + docs[0].username);
                }
                console.log(sess.username);
            }
            else{
                res.redirect("/login?success=true");
            }
        }
        else{
            res.redirect("/login?success=true");
        }
    });
});

router.get("/register", function (req, res, next) {
    sess = req.session;

    if(sess.username){
        res.render('newuser', {loginData: sess.username});
    }
    else{
        res.render('newuser');
    }
});

router.post("/registerUser", function (req, res, next) {
    var db = req.db;
    var uname = req.body.uNameSet;
    var email = req.body.mailSet;
    var password = req.body.passwordSet.hashCode();
    var first = req.body.firstname;
    var last = req.body.lastname;

    var collection = db.get("users");

    collection.insert({
        "username": uname,
        "email": email,
        "password": password,
        "firstname": first,
        "lastname": last
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("Not Today");
        }
        else {
            console.log(doc);
            // And forward to success page
            res.redirect("../login");
        }
    });
});


router.get('/logout',function(req,res) {
    req.session.destroy(function (err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/login/');
        }
    });
});

module.exports = router;