Chat = new Meteor.Stream('chat');

if (Meteor.isServer) {
    Chat.permissions.read(function(eventName) {
		return eventName === this.userId;
	});                                                                                                                                                                                                                                                                                                                                                                                            
	Chat.permissions.write(function() {
        return true;
    });
}

if (Meteor.isClient) {
    Chat.on(Meteor.userId(), function(message) {
        vex.dialog.alert(message.profile.name + ": " + message.text);
    });
}
