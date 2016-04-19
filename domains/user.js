"use strict";
var Sequelize = require("sequelize");
var sequelize = new Sequelize(config.database, config.username, config.password, config);
//exports.User = function(){};
module.exports = function(sequelize, Sequelize) {
  var User = sequelize.define("User", {
    username: Sequelize.STRING
  }, {
    classMethods: {
      associate: function(models) {
        User.hasMany(models.Task)
      }
    }
  });

  return User;
};