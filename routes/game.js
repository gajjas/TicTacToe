var express = require('express');
var MongoClient = require("mongodb").MongoClient;
var url = require('../dbURL');
var ObjectId = require('mongodb').ObjectId;

var router = express.Router();

router.get('/:id', function (req, res) {
    var gameData = {
    };
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, async function (err, client) {
        try {
            game = await client.db("TicTacToe").collection("Games").findOne({ _id: ObjectId(req.params.id) })
            p1 = await client.db("TicTacToe").collection("UserProfile").findOne({ _id: ObjectId(game.playerOneId) });
            p2 = await client.db("TicTacToe").collection("UserProfile").findOne({ _id: ObjectId(game.playerTwoId) });

            gameData.playerOne = p1.username;
            gameData.playerTwo = p2.username;
            gameData.date = game.datePlayed;
            gameData.result = game.gameResult;
            gameData.gameString = game.gameString;

            console.log(gameData)
            res.render("game", { data: gameData });
        }
        catch (e) {
            res.send("Error")
        }
    });
});

module.exports = router;