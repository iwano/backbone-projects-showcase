/*global ProjectsShowcase, $*/


window.ProjectsShowcase = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    init: function () {
        'use strict';
        var Projects = new ProjectsShowcase.Collections.Project(ProjectsFixtures);
        new ProjectsShowcase.Views.Projects({
          collection: Projects
        });
    }
};

$(document).ready(function () {
    'use strict';
    ProjectsShowcase.init();
});
