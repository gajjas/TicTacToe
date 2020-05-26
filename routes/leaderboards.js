var express = require('express');
var router = express.Router();

/* GET leaderboards listing. */
router.get('/', function (req, res, next) {
  res.render('leaderboard');
});

module.exports = router;
