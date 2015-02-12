/*global ProjectsShowcase, $*/

window.ProjectsShowcase = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    init: function () {
        'use strict';
        ProjectsShowcase.projectsRouter = new ProjectsShowcase.Routers.ProjectsRouter();
        Backbone.history.start();
    }
};

$(document).ready(function () {
    'use strict';
    ProjectsShowcase.init();
});
