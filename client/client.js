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