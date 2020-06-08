var express = require('express');
var MongoClient = require("mongodb").MongoClient;
var url = require('../dbURL');
var ObjectId = require('mongodb').ObjectId;

var router = express.Router();

router.post('/', (req, res) => {
    console.log(req.body);
    console.log("/" + req.body.query);
    res.redirect("/users/" + req.body.query);
});

router.get('/:name', (req, res) => {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, async function (err, client) {
        try {
            results = await client.db("TicTacToe").collection("UserProfile").findOne({ username: req.params.name });

            var user = {
                id: results._id,
                username: results.username,
                profilePicture: results.profilePicture,
                games: []
            }

            for (let x = 0; x < results.gameID.length; x++) {
                game = await client.db("TicTacToe").collection("Games").findOne({ _id: ObjectId(results.gameID[x]) });

                var gameObj = {
                    id: game._id,
                    date: game.datePlayed
                }

                p1 = await client.db("TicTacToe").collection("UserProfile").findOne({ _id: ObjectId(game.playerOneId) });
                p2 = await client.db("TicTacToe").collection("UserProfile").findOne({ _id: ObjectId(game.playerTwoId) });

                if (user.username == p1.username) {
                    gameObj.opponent = p2.username;

                    if (game.gameResult == 0) {
                        gameObj.outcome = "Tie"
                    } else if (game.gameResult == 1) {
                        gameObj.outcome = "Won"
                    } else {
                        gameObj.outcome = "Loss"
                    }
                } else {
                    gameObj.opponent = p1.username;

                    if (game.gameResult == 0) {
                        gameObj.outcome = "Tie"
                    } else if (game.gameResult == 1) {
                        gameObj.outcome = "Loss"
                    } else {
                        gameObj.outcome = "Won"
                    }
                }
                user.games.push(gameObj)
            }

            console.log(user)

            res.render("userProfile", { data: user });
        } catch (err) {
            console.log(err)
            res.send(err)
        }
    })
});

module.exports = router;