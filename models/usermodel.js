var express = require('express');

/* GET users listing. */
exports.get = function getListUser(pool, callback) {
	pool.getConnection(function(err, connection) {
		connection.query('SELECT username, email, gender, birthday, tel, address FROM tblUser ORDER BY username', 
			function(err, rows, fields) {
				if (err) {
					callback(err, null);
				}
				callback(null, rows);
			});
		connection.release();
	});	
}

/* Register. */
exports.add = function addUser(pool, newUserInfo, callback) {
	pool.getConnection(function(err, connection) {
		//way1
		//connection.query('INSERT INTO tblUser SET username=?, email=?, gender=?, birthday=?, tel=?, address=?', newUserInfo,function(err, results) {});
		//way2
		connection.query('INSERT INTO tblUser SET ?', newUserInfo,
			function(err, results) {
				if (err) {
					callback(err, null);
				}
				callback(null, results);
			});
		connection.release();
	});	
}

/* Update. */
exports.update = function updateUser(pool, userInfo, callback) {
	pool.getConnection(function(err, connection) {
		connection.query('UPDATE tblUser SET ? WHERE ?', userInfo,
			function(err, results) {
				if (err) {
					callback(err, null);
				}
				callback(null, results);
			});
		connection.release();
	});	
}

/* Delete. */
exports.del = function deleteUser(pool, userInfo, callback) {
	pool.getConnection(function(err, connection) {
		connection.query('DELETE FROM tblUser WHERE ?', userInfo,
			function(err, results) {
				if (err) {
					callback(err, null);
				}
				callback(null, results);
			});
		connection.release();
	});	
}