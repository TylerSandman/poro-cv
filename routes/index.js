var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.post('/', function(req, res) {
   console.log("Got request from client!");
   console.log(req);
   res.json({"ayy": "lmao"});
}


module.exports = router;
