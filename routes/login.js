/**
 * Created by Quintin on 28-12-2016.
 */
var express = require('express');
var router = express.Router();
var session = require('express-session');
var nodemailer = require('nodemailer');

var smtpConfig = {
    host: 'smtp-mail.outlook.com',
    port: 587,
    secure: false,
    auth: {
        user: 'hqlh@hotmail.nl',
        pass: 'quintin1605QHlh0411'
    }
};

var transporter = nodemailer.createTransport(smtpConfig);

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
router.get('/', function (req, res) {
    sess = req.session;

    if (sess.username) {
        res.render('login', {loginData: sess.username});
    }
    else {
        res.render('login', {loginData: false});
    }
});


router.post('/loginuser', function (req, res, next) {
    var db = req.db;

    var uname = req.body.uName;
    var pWord = req.body.passWord;
    var pwvalue = pWord.hashCode();
    var collection = db.get("users");

    collection.find({"username": uname}, {}, function (e, docs) {
        if (docs) {
            if (docs[0].password === pwvalue) {
                if(docs[0].verified === true) {
                    sess = req.session;

                    sess.username = docs[0].username;

                    if (sess.username) {
                        res.redirect("../users/" + docs[0].username);
                    }
                    console.log(sess.username);
                }
                else{
                    res.redirect("/login?verified=false");
                }
            }
            else {
                res.redirect("/login?error=true");
            }
        }
        else {
            res.redirect("/login?error=true");
        }
    });
});

router.get("/register", function (req, res, next) {
    sess = req.session;

    if (sess.username) {
        res.render('newuser', {loginData: sess.username});
    }
    else {
        res.render('newuser', {loginData: false});
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
    var collection2 = db.get("verification");

    collection.insert({
        "username": uname,
        "email": email,
        "password": password,
        "firstname": first,
        "lastname": last,
        "verified": false
    }, function (err, doc) {
        if (err) {
            res.send(err);
        }
        else {
            console.log(doc);
            collection2.insert({
                "user": doc._id,
                "email": doc.email
            }, function (err2, doc2) {
                if (err2) {
                    res.send(err2);
                }
                else {
                    console.log(doc2);

                    var mailOptions = {
                        from: 'hqlh@hotmail.nl',
                        to: doc2.email,
                        subject: 'Hello ✔',
                        text: 'Hello world ? http://localhost:3000/verify/' + doc2._id,
                        html: '<style>body{font-family: "Muli", sans-serif; padding:30px; text-align: left;}' +
                        'p{font-size: 15px}' +
                        'h1{font-size: 25px}' +
                        '</style>' +
                        '<h1>Dear '+doc.firstname+',</h1><br>' +
                        '<p>Thank you for registering to CoBit</p>' +
                        '<a href="http://localhost:3000/verify/'+doc2._id+'">Click this link to verify your account</a>' +
                        '<p>Happy coding and see you soon!</p><br>' +
                        '<p>Yours sincerely,</p><br>' +
                        '<p>The CoBit team (me)</p>'
                    };

                    transporter.sendMail(mailOptions, function(error, info){
                        if(error){
                            return console.log(error);
                        }
                        console.log('Message sent: ' + info.response);

                        res.redirect("../login");
                    });
                }
            });
        }
    });
});

router.get('/logout', function (req, res) {
    req.session.destroy(function (err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/login/');
        }
    });
});


module.exports = router;