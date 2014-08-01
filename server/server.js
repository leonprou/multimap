Meteor.methods({
	updateLocation: function(location) {
		Users.update({_id : location.userId}, {$set: {position: location.position, online: true}});
	},
	removeLocation: function() {
		Users.update({_id : location.userId}, {$set: {online: false}});
	}
});

