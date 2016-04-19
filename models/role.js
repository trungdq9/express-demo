"use strict";
module.exports = function(sequelize, DataTypes) {
	var Role = sequelize.define("Role", {
		roleId: {type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV1},
		roleNo: {type: DataTypes.INTEGER, unique: true, autoIncrement: true},
		roleName: {type: DataTypes.STRING, allowNull: false, unique: true},
		description: DataTypes.TEXT,
		bActive: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true},
	}, {
	  	timestamps: true,
	  	paranoid: true,
	  	underscored: false,
	  	freezeTableName: true,
	  	validate: {
	  	},
	    classMethods: {
	    },
	    instanceMethods: {
	  	}
  	});

	return Role;
};