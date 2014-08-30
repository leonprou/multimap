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
	'click #user-panel': function() {
		Session.set('usersPanel', !Session.get('usersPanel'));
		GAnalytics.event('users');
	},
	'click .users-online div': function() {
		var content = UI.renderWithData(Template.infowindow, this),
			wraper = $('<div></div').get(0);
		UI.insert(content, wraper);
		vex.open({
			content: wraper,
			className: 'vex-theme-wireframe'
		});
		GAnalytics.event('users', 'specific');

	}
});