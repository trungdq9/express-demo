var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	//res.render('index', { title: 'Express' });
	res.sendfile('index.html');
});

/*router.get('/userss', function() {
	res.redirect('/users/list');
});*/

module.exports = router;
