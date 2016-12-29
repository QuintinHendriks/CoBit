/**
 * Created by Quintin on 29-12-2016.
 */
var express = require('express');
var router = express.Router();

router.get("/userlist", function(req, res){
    var db = req.db;
    var collection = db.get('users');
    collection.find({},{},function(e,docs){
        res.json(docs);
    });
});

module.exports = router;