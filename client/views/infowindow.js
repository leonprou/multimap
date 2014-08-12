Template.infowindow.helpers({
	isLoggedUser: function() {
		return this._id === Meteor.userId();
	}
});

Template.infowindow.events({
	'click #infowindow-center': function() {
		gmap.map.panTo(this.position);
	},
	'click #infowindow-streetView': function() {
		var panorama = gmap.map.getStreetView();
		panorama.setPosition(this.position);
		panorama.setVisible(true);
	},
	'click #infowindow-message': function() {
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