Meteor.methods({
	updateLocation: function(location) {
		Users.update({userId : location.userId}, {$set: {position: location.position, online: true}});
	},
	removeLocation: function() {
		Users.update({userId : location.userId}, {$set: {online: false}});
	}
});

