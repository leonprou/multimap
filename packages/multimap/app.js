'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Multimap = new Module('multimap');

Multimap.angularDependencies(['google-maps']);
/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Multimap.register(function(app, auth, database) {

    //We enable routing. By default the Package Object is passed to the routes
    Multimap.routes(app, auth, database);

    //We are adding a link to the main menu for all authenticated users
    Multimap.menus.add({
        title: 'multimap',
        link: 'multimap',
        roles: ['authenticated'],
        menu: 'main'
    });

    /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Multimap.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Multimap.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Multimap.settings(function(err, settings) {
        //you now have the settings object
    });
    */
    Multimap.aggregateAsset('css', 'multimap.css');

    return Multimap;
});
