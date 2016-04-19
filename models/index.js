"use strict";
var db 			= {}
	, Sequelize = require('sequelize')
	, fs        = require("fs")
	, path      = require("path")
  	, env       = process.env.NODE_ENV || "dev"
  	, config    = require(path.join(__dirname, '../configs/config.json'))
  		//dev env
  	// , sequelize = new Sequelize(config.dev.database, config.devusername, config.dev.password, {
   //  	host: config.dev.host,
   //  	port: config.dev.port,
   //  	logging: false,
   //  	dialect: config.dev.dialect,
   //  	pool: {
   //  		max: 5,
   //  		min: 0,
   //  		idle: 10000
   //  	}
  	// });
	, sequelize = new Sequelize('mysql://root:123456@localhost:3306/nodejsdemo', {});

var   User = sequelize.import(path.join(__dirname, '/user'))
	, Role = sequelize.import(path.join(__dirname, '/role'));


fs
    .readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf(".") !== 0) && (file !== "index.js");
    })
    .forEach(function(file) {
        var model = sequelize["import"](path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(function(modelName) {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});


User.belongsTo(User, {as: 'createdUser', foreignKey: 'createdBy'});
User.belongsTo(User, {as: 'updatedUser', foreignKey: 'updatedBy'});
User.belongsTo(Role, {as: 'role', foreignKey: 'roleId'});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

