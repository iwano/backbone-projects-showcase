/*global ProjectsShowcase, Backbone*/

ProjectsShowcase.Routers = ProjectsShowcase.Routers || {};

(function () {
  'use strict';

  ProjectsShowcase.Routers.ProjectsRouter = Backbone.Router.extend({

    routes: {
      "":                                   "showProjectsList",
      "projects": "showProjectsList",
      "projects/new":                       "showProjectsNew",
      "projects/:id":                       "showProjectsDetails"
    },

    initialize: function() {
      ProjectsShowcase.projects = new ProjectsShowcase.Collections.Project();
      ProjectsShowcase.projects.fetch().then(function() {
        if (ProjectsShowcase.projects.length === 0) {
          ProjectsShowcase.projects.reset(ProjectsFixtures);
          ProjectsShowcase.projects.each(function(model) {
            model.save();
          });
        }
      });
    },

    showProjectsList: function(params) {
      this.cleanViews();
      var collection,
          projects,
          params = params || {};
      if (params.filter && params.filter != 'all') {
        var active = params.filter == 'active';
        projects =   ProjectsShowcase.projects.where({ active: active });
        collection = new ProjectsShowcase.Collections.Project(projects);
      }
      ProjectsShowcase.projectsView = new ProjectsShowcase.Views.Projects({
        collection: (collection    || ProjectsShowcase.projects),
        orderBy:    (params.sort   || 'id'),
        order:      (params.order  || 'ASC'),
        filterBy:   (params.filter || 'all')
      });
    },

    showProjectsDetails: function(projectId) {
      this.cleanViews();
      var project =  ProjectsShowcase.projects.findWhere({ id: +projectId }),
          previous = ProjectsShowcase.projects.at(ProjectsShowcase.projects.indexOf(project) - 1),
          next =     ProjectsShowcase.projects.at(ProjectsShowcase.projects.indexOf(project) + 1);

      ProjectsShowcase.currentProjectView = new ProjectsShowcase.Views.ProjectDetails({
        model:    project,
        previous: (previous && previous.get('id')),
        next:     (next && next.get('id'))
      });
    },

    showProjectsNew: function() {
      this.cleanViews();
      var project =  ProjectsShowcase.projects.create();

      ProjectsShowcase.currentProjectView = new ProjectsShowcase.Views.ProjectDetails({
        model: project
      });
    },

    cleanViews: function() {
      if (ProjectsShowcase.projectsView) {
        ProjectsShowcase.projectsView.close();
      }
      if (ProjectsShowcase.currentProjectView) {
        ProjectsShowcase.currentProjectView.close();
      }
    }

  });

})();
