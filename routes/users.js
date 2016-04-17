var express = require('express');
var router = express.Router();
var usermodel = require('../models/usermodel');

/* GET users listing. */
router.get('/list', function(req, res) {
	usermodel.get(req.app.get('pool'), function(err, data) {
		if (err) {
			console.error(err.stack);
			//res.json(err);
		} else {
			res.json(data);
			//res.render('user', {users: data});
		}
	});
	/*getListUser(req.app.get('pool'), function(err, data) {
		if (err) {
			console.error(err.stack);
		} else {
			res.json(data);
			//res.render('user', {users: data});
		}
	});*/
});

router.post('/add', function(req, res) {
	console.log(req.body);
	//way1
	//var newUserInfo = ['Minh Vu', 'minh.vu@gmail.com', 'Male', '2015-09-09', '0123999666', 'Go Vap District'];
	//way2
	var newUserInfo = {
		username: 'Hung Tang', 
		email: 'hung.tang@gmail.com', 
		gender: 'Male', 
		birthday: '2015-09-09', 
		tel: '0123999666', 
		address: 'Tan Binh District'
	};
	usermodel.add(req.app.get('pool'), req.body, function(err, data) {
		if (err) {
			console.error(err.stack);
		} else {
			res.json(data);
		}
	});
	/*addUser(req.app.get('pool'), req.body, function(err, data) {
		if (err) {
			console.error(err.stack);
		} else {
			res.send(data);
		}
	});*/
});

router.post('/update', function(req, res) {
	//var userInfo = [{email: 'hung.tang2@gmail.com', gender: 'Male', birthday: '2015-09-09', tel: '0123999666', address: 'Tan Binh District'}, {username: 'Hung Tang'}];
	var userInfo = [{
		email: req.body.email, 
		gender: req.body.gender, 
		tel: req.body.tel, 
		address: req.body.address
	}, {
		username: req.body.username
	}];
	usermodel.update(req.app.get('pool'), userInfo, function(err, data) {
		if (err) {
			console.error(err.stack);
		} else {
			res.json(data);
		}
	});
	/*pdateUser(req.app.get('pool'), userInfo, function(err, data) {
		if (err) {
			console.error(err.stack);
		} else {
			res.send(data);
		}
	});*/
});

router.post('/delete', function(req, res) {
	//var userInfo = {username: 'Hung Tang'};
	var userInfo = {username: req.body.username};
	usermodel.del(req.app.get('pool'), userInfo, function(err, data) {
		if (err) {
			console.error(err.stack);
		} else {
			res.json(data);
		}
	});
	/*deleteUser(req.app.get('pool'), userInfo, function(err, data) {
		if (err) {
			console.error(err.stack);
		} else {
			res.send(data);
		}
	});*/
});

module.exports = router;