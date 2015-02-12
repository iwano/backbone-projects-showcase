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
      var ProjectsListView = new ProjectsShowcase.Views.Projects({
        collection: ProjectsShowcase.projects
      });
    },

    showProjectsDetails: function(projectId) {
      if (ProjectsShowcase.currentProject) {
        this.cleanProjectDetails();
      }
      ProjectsShowcase.currentProject = ProjectsShowcase.projects.findWhere({ id: +projectId });
      new ProjectsShowcase.Views.ProjectDetails({
        model: ProjectsShowcase.currentProject
      });
    },

    cleanProjectDetails: function() {
      ProjectsShowcase.dispatcher.trigger('cleanProjectDetails');
    }

  });

})();
