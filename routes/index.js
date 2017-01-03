var express = require('express');
var router = express.Router();
var session = require('express-session');

/* GET Hello World page. */
router.get('/helloworld', function (req, res) {
    res.render('helloworld', {title: 'Hello, World!'});
});

router.get('/test', function (req, res) {
    res.render('test', {title: 'Hello, World!'});
});

var sess;
router.get("/", function(req, res){
    sess = req.session;

    if(sess.username){
        res.render('home', {loginData: sess.username});
    }
    else{
        res.render('home');
    }
});

module.exports = router;