Meteor.publish('users', function() {
	// TODO: move online users sellection here 
	return Users.find({}, { fields:  { profile: 1, position: 1, 'status.online': 1 }});
});