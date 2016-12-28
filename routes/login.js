/**
 * Created by Quintin on 28-12-2016.
 */
var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('login', {title: 'Login to CoBit'});
});

module.exports = router;