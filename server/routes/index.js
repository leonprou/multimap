'use strict';

module.exports = function(app) {

    // Home route
    var index = require('../controllers/index');

    //for unknown reason app.route doesn't work here
    app.get('/', index.render);

};
