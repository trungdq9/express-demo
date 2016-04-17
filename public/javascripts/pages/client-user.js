"use strict";

var userList = [];
$(document).ready(function() {
	loadUserTable();
});

function loadUserTable() {
	$.ajax({
            type: 'GET',
            url: '/users/list',
            dataType: 'JSON'
        }).done(function(response) {});
}