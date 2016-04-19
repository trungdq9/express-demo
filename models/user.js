"use strict";
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
  	userId: {type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV1},
  	userNo: {type: DataTypes.INTEGER, unique: true, autoIncrement: true},
    username: {type: DataTypes.STRING, allowNull: false, unique: true},
    email: {type: DataTypes.STRING, unique: true, allowNull: false,
    	validate: {notEmpty: true, isEmail: true}
    },
    password: {type: DataTypes.STRING, allowNull: false,
    	validate: {notEmpty: true, len: [8,255]}
    },
    facebookId: {type: DataTypes.STRING, allowNull: true},
    googleId: {type: DataTypes.STRING, allowNull: true},
    gender: {type: DataTypes.ENUM('Male', 'Female', 'Other')},
    fullName: {type: DataTypes.STRING, allowNull: true},
    address: {type: DataTypes.STRING, allowNull: true},
    birthday: {type: DataTypes.DATE, allowNull: true,
    	validate: {isBefore: DataTypes.NOW}
    },
    tel: {type: DataTypes.STRING, allowNull: true},
    description: DataTypes.TEXT,
    bActive: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true},
    // It is possible to create foreign keys:
    /*createdBy: {type: DataTypes.INTEGER,
    	references: {
    		// This is a reference to another model
		    model: User,
		    // This is the column name of the referenced model
		    key: 'userId'
    	}
    },
    updatedBy: {type: DataTypes.INTEGER, references: {model: User, key: 'userId'}}*/
  }, {
  	// add the timestamp attributes (updatedAt, createdAt)
  	timestamps: true,
  	// don't delete database entries but set the newly added attribute deletedAt
  	// to the current date (when deletion was done). paranoid will only work if
  	// timestamps are enabled
  	paranoid: true,
  	// use camelcase for automatically added attributes, otherwise use underscore style
  	// so updatedAt will be updatedAt instead of updated_at
  	underscored: false,
  	// disable the modification of table names; By default, sequelize will automatically
  	// transform all passed model names (first parameter of define) into plural.
  	// if you don't want that, set the following
  	freezeTableName: true,
  	// define the table's name
  	//tableName: 'my_very_custom_table_name'
  	// model validation
  	validate: {

  	},
    classMethods: {
	    associate: function(models) {
	    	//User.hasMany(models.Task)
	    	User.belongsTo(models.User, {as: 'createdUser', foreignKey: 'createdBy'});
			User.belongsTo(models.User, {as: 'updatedUser', foreignKey: 'updatedBy'});
			User.belongsTo(models.Role, {as: 'role', foreignKey: 'roleId'});
	    }
    },
    instanceMethods: {
    	retrieveAll: function(onSuccess, onError) {
			User.findAll({}, {raw: true})
				.success(onSuccess)
				.error(onError);	
	  		},
    	}
  	});

	//User.hasOne(models.User, {as: 'createdUser', foreignKey: 'createdBy'});
	return User;
};






/*var express = require('express');

// GET users listing. 
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

// Register.
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

// Update.
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

// Delete.
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
} */