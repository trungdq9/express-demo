"use strict";

$(function(){
	$("#btnToUserView").on('click', function(){
		//window.location.href = "/users/list";
		$.ajax({
			type: 'GET',
			url: '/userView'
		}).done(function(data) {
			console.log(JSON.stringify(data));
        });
	});
});