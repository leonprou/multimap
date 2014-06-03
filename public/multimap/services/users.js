'use strict';

//Articles service used for articles REST endpoint
angular.module('multimap').factory('Users', ['$resource',
	function($resource) {
		return $resource('users/:userId', null, {
			update: {
				method: 'PUT',
				isArray: true
			}
		});
	}
]);
