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
      new ProjectsShowcase.Views.Projects({
        collection: ProjectsShowcase.projects
      });
    },

    showProjectsDetails: function(projectId) {
      this.cleanViews();
      var project =  ProjectsShowcase.projects.findWhere({ id: +projectId }),
          previous = ProjectsShowcase.projects.at(ProjectsShowcase.projects.indexOf(project) - 1),
          next =     ProjectsShowcase.projects.at(ProjectsShowcase.projects.indexOf(project) + 1);

      ProjectsShowcase.currentProject = new ProjectsShowcase.Views.ProjectDetails({
        model:    project,
        previous: (previous && previous.get('id')),
        next:     (next && next.get('id'))
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
