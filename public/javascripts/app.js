angular.module('courseMnmt', ['ngRoute', 'ngResource'])
	.config(function ($routeProvider) {
		'use strict';

		$routeProvider
			.when('/userss', {
				controller: 'userController',
				templateUrl: 'users.html',
			})
			.otherwise({
				redirectTo: '/'
			});
	});