Meteor.publish('users', function() {
	return Users.find({}, {
		fields: {
			profile: 1,
			position: 1,
			'status.online': 1
		}
	});
});