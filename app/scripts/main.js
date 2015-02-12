/*global ProjectsShowcase, $*/


window.ProjectsShowcase = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    dispatcher: _.clone(Backbone.Events),
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
