/*global ProjectsShowcase, $*/


window.ProjectsShowcase = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    init: function () {
        'use strict';
        var Projects = new ProjectsShowcase.Collections.Project();
        Projects.reset(ProjectsFixtures);
    }
};

$(document).ready(function () {
    'use strict';
    ProjectsShowcase.init();
});
