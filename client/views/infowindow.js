Template.infowindow.helpers({
	isLoggedUser: function() {
		return this.profile.name === Meteor.user().profile.name;
	}
});

Template.infowindow.events({
	'click #infowindow-center': function(event) {
		gmap.map.panTo(this.position);
	},
	'click #infowindow-streetView': function(event) {
		var panorama = gmap.map.getStreetView();
		panorama.setPosition(this.position);
		panorama.setVisible(true)
	},
});