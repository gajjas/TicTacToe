var express = require('express');
var router = express.Router();
var MongoClient = require("mongodb").MongoClient
var url = require("../dbURL")

var date = function () {
    let ts = Date.now();
    let date_ob = new Date(ts);
    let date = date_ob.getDate();
    let month = date_ob.getMonth() + 1;
    let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();

    var dateString = year + "-" + month + "-" + date + "-" + hours + "-" + minutes + "-" + seconds;

    return dateString;
}

router.get('/', function (req, res, next) {
    res.render('register');
});

router.post('/', (req, res) => {

    var auth = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        isVerified: false,
        timeCreated: date()
    }

    var user = {
        username: req.body.username,
        profilePicture: "dsafsdafaf",
        gameID: []
    }

    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
        client.db("TicTacToe").collection("Authentication").findOne({ $or: [{ username: req.body.username }, { email: req.body.email }] }, (err, result) => {
            if (result == null) {
                client.db("TicTacToe").collection("Authentication").insertOne(auth, (err, data) => {
                    if (err) {
                        res.send("Error: Could Not Create User");
                    }
                });
                client.db("TicTacToe").collection("UserProfile").insertOne(user, (err, data) => {
                    if (err) {
                        console.log(err)
                    }
                });
                res.redirect("/");
            } else {
                res.send("Username already taken!!!");
            }
        })
    })
});

module.exports = router;