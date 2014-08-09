"use strict";

Chat = new Meteor.Stream('chat');

if (Meteor.isServer) {
    Chat.permissions.read(function(eventName) {
		// Meteor._debug('read' + eventName);
		// Meteor._debug(this);
		return eventName === this.userId;
	});                                                                                                                                                                                                                                                                                                                                                                                            
	Chat.permissions.write(function() {
		// Meteor._debug('write' + eventName);
		// Meteor._debug(this);
        return true;
    });
}

if (Meteor.isClient) {
    Chat.on(Meteor.userId(), function(message) {
        vex.dialog.alert(message.profile.name + ": " + message.text);
    });
}
