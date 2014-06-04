'use strict';

var mean = require('meanio');

module.exports = function(app) {

    //for unknown reason app.route doesn't work here
    app.get('/admin/menu/:name', function(req, res) {
        var roles = (req.user ? req.user.roles : ['anonymous']);
        var menu = req.params.name ? req.params.name : 'main';
        var defaultMenu = (req.query.defaultMenu ? req.query.defaultMenu : []);

        defaultMenu.forEach(function(item, index) {
            defaultMenu[index] = JSON.parse(item);
        });
        var items = mean.menus.get({
            roles: roles,
            menu: menu,
            defaultMenu: defaultMenu
        });
        res.jsonp(items);
    });
};