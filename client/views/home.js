Template.home.helpers({
  isLoggedIn: function() {
    return Meteor.user() != null;
  }
});

Template.home.events({
  'click button': function(event, template) {
    Session.set('myAppVariable', Math.floor(Math.random() * 11));
  }
});