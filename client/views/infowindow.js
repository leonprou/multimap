Template.infowindow.helpers({
	isLoggedUser: function() {
		return this._id === Meteor.userId();
	}
});

Template.infowindow.events({
	'click #infowindow-center': function() {
		GAnalytics.event('infowindow', 'center');
		gmap.map.panTo(this.position);

	},
	'click #infowindow-streetView': function() {
		GAnalytics.event('infowindow', 'sreet-view');
		var panorama = gmap.map.getStreetView();
		panorama.setPosition(this.position);
		panorama.setVisible(true);

	},
	'click #infowindow-message': function() {
		GAnalytics.event('infowindow', 'message');
		var self = this;
		vex.dialog.prompt({
			message: 'Write your message',
			placeholder: 'A friendly greeting',
			callback: function(text) {
				if (text !== false) {
					Chat.emit(self._id, {
						profile: Meteor.user().profile,
						text: text
					});
				}
			}
		});
	}
});