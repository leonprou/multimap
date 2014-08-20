Template.about.events({
	'click #about': function() {
		var content = UI.render(Template.aboutPage),
			wraper = $('<div></div').get(0);
		UI.insert(content, wraper);
		vex.open({
			content: wraper
		});
	}
});