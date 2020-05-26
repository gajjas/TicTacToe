var express = require('express');
var MongoClient = require("mongodb").MongoClient;
var url = require('../dbURL');

var router = express.Router();

router.post('/', (req, res) => {
    console.log(req.body);
    console.log("/" + req.body.query);
    res.redirect("/users/" + req.body.query);
});

router.get('/:name', (req, res) => {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
        client.db("TicTacToe").collection("UserProfile").findOne({ username: req.params.name }, (err, results) => {
            if (err) {
                console.log(err)
                res.send([]);
            }

            res.render("userProfile", { data: results });
        })
    })
});

module.exports = router;