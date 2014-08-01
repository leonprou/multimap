Meteor.methods({
	updateLocation: function(location) {
		Users.update({_id : location.userId}, {$set: {position: location.position, online: true}});
	},
	removeLocation: function() {
		Users.update({_id : Meteor.userId()}, {$set: {online: false}});
	}
});

Accounts.onLogin(function(attemptInfo) {
	Users.update({_id: attemptInfo.user._id}, {$set: {online: true}});
});
