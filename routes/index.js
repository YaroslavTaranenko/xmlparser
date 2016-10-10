var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/docs/:fname', function(req, res, next){
    res.sendFile('/home/yaroslav/www/xmlparser/public/docs/' + req.params["fname"]);
});

module.exports = router;
