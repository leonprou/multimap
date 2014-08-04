if (Meteor.isClient) {
	var _logout = Meteor.logout;
	Meteor.logout = function customLogout() {

		Meteor.call('removeLocation');
		_logout.apply(Meteor, arguments);
	}
}

Accounts.ui.config({
	passwordSignupFields: 'USERNAME_AND_OPTIONAL_EMAIL'
});

UI.registerHelper('username', function() {
	return Meteor.user().profile.name;
});

UI.body.rendered = function() {
	vex.defaultOptions.className = 'vex-theme-default';
	gmap = new Gmap();
};