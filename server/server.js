Meteor.methods({
	updateLocation: function(position) {
		Users.update({_id :  Meteor.userId()}, {$set: {position: position, online: true}});
	},
	removeLocation: function() {
		Users.update({_id : Meteor.userId()}, {$set: {online: false}});
	}
});

Accounts.onLogin(function(attemptInfo) {
	Users.update({_id: attemptInfo.user._id}, {$set: {online: true}});
});

Accounts.onCreateUser(function(options, user) {
	if (options.profile)
	    user.profile = options.profile;
	else {
		user.profile = { name: user.username };
		delete user.username;
	}
	return user;
});
