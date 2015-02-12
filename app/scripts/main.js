/*global ProjectsShowcase, $*/


window.ProjectsShowcase = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    init: function () {
        'use strict';
        new ProjectsShowcase.Routers.Projects();
        Backbone.history.start();
    }
};

$(document).ready(function () {
    'use strict';
    ProjectsShowcase.init();
});
