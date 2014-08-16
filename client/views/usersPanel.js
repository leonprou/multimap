Template.usersPanel.helpers({
	users: function users() {
		return Users.find({
			'status.online': true,
			'status.idle': {
				$exists: false
			}
		});
	},
	usersVisible: function usersVisible() {
		return Session.get('usersPanel');
	}
});

Template.usersPanel.events({
	'click #user-panel' : function() {
		Session.set('usersPanel', !Session.get('usersPanel'));
	}
});