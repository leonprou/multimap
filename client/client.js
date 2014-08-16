/*global Gmap:true, UserStatus:false*/

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

Deps.autorun(function(c) {
	try {
		UserStatus.startMonitor({
			threshold: 1000,
			interval: 1000,
			idleOnBlur: false
		});
		
		c.stop();
	} catch(ignore) {}
});
