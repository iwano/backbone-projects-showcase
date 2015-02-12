/*global ProjectsShowcase, Backbone*/

ProjectsShowcase.Routers = ProjectsShowcase.Routers || {};

(function () {
    'use strict';

    ProjectsShowcase.Routers.Projects = Backbone.Router.extend({

      routes: {
        "":             "showProjectsList",
        "projects":     "showProjectsList",
        "projects/:id": "showProjectsDetails"
      },

      showProjectsList: function() {
        var Projects = new ProjectsShowcase.Collections.Project(ProjectsFixtures);
        var ProjectsListView = new ProjectsShowcase.Views.Projects({
          collection: Projects
        });
      },

      showProjectsDetails: function() {
      }

    });

})();
