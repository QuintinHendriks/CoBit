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





module.exports = router;