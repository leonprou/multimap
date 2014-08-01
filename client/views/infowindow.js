Template.infowindow.helpers({
	username: function() {
		return Meteor.user().profile.name;
	},
	panTo: function() {
		alert('panTo');
	},
	isLoggedUser: function() {
		debugger;
		return this.profile.name === Meteor.user().profile.name;
	},
	user: function() {
		return Meteor.user();
	}
});