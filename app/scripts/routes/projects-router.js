/*global ProjectsShowcase, Backbone*/

ProjectsShowcase.Routers = ProjectsShowcase.Routers || {};

(function () {
  'use strict';

  ProjectsShowcase.Routers.ProjectsRouter = Backbone.Router.extend({

    routes: {
      "":             "showProjectsList",
      "projects":     "showProjectsList",
      "projects/:id": "showProjectsDetails"
    },

    initialize: function() {
      ProjectsShowcase.projects = new ProjectsShowcase.Collections.Project(ProjectsFixtures);
    },

    showProjectsList: function() {
      this.cleanViews();
      var ProjectsListView = new ProjectsShowcase.Views.Projects({
        collection: ProjectsShowcase.projects
      });
    },

    showProjectsDetails: function(projectId) {
      this.cleanViews();
      var project = ProjectsShowcase.projects.findWhere({ id: +projectId });

      ProjectsShowcase.currentProject = new ProjectsShowcase.Views.ProjectDetails({
        model: project
      });
    },

    cleanViews: function() {
      if (ProjectsShowcase.currentProject) {
        ProjectsShowcase.currentProject.close();
        delete ProjectsShowcase.currentProject;
      }
    }

  });

})();
