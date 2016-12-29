/**
 * Created by Quintin on 28-12-2016.
 */
var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('login', {title: 'Login to CoBit'});
});

router.post('/login', function (req, res, next){
    var db = req.db;

    var uname = req.body.uName;
    var password = req.body.password;

    var collection = db.get("users");


});

router.get("/register", function(req, res, next){
   res.render("newuser", {title: "Register to CoBit"});
});

module.exports = router;