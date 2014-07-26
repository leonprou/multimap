Meteor.methods({
	updateLocation: function(location) {
		Locations.upsert({userId : location.userId}, location);
	},
	removeLocation: function() {
		Locations.remove({userId : Meteor.userId()});
	}
});

