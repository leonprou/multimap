/*global Gmap:true, UserStatus:false, GoogleMaps:false */

Accounts.ui.config({
	passwordSignupFields: 'USERNAME_AND_OPTIONAL_EMAIL'
});

UI.registerHelper('username', function() {
	return Meteor.user().profile.name;
});

UI.body.rendered = function() {
	vex.defaultOptions.className = 'vex-theme-wireframe';
};


Template.home.rendered=function(){
  this.autorun(_.bind(function(){
    if(GoogleMaps.ready()){
    	gmap = new Gmap();
    }
  },this));
};

Deps.autorun(function(c) {
	try {
		UserStatus.startMonitor({
			threshold: 15 * 60 * 1000,
			interval: 60 * 1000,
			idleOnBlur: false
		});
		
		c.stop();
	} catch(ignore) {}
});