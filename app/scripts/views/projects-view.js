/*global ProjectsShowcase, Backbone, JST*/

ProjectsShowcase.Views = ProjectsShowcase.Views || {};

(function () {
  'use strict';

  ProjectsShowcase.Views.Projects = Backbone.View.extend({

    template: JST['app/scripts/templates/projects-template.hbs'],

    tagName: 'section',

    id: 'projects-container',

    className: '',

    events: {
      "click a[js-filter-all]":      "showAll",
      "click a[js-filter-active]":   "showActive",
      "click a[js-filter-inactive]": "showInactive",
      "click a[js-project-new]":     "newProject"
    },

    initialize: function(){
      this.collection.on('sort', this.render, this);
      this.views = [];
      this.render();
    },

    render: function () {
      $("#main-content").html(
        this.$el.html(this.template)
      );
      this.addAll();
    },

    addAll: function() {
      this.collection.each(this.addOne, this);
    },

    addOne: function(project) {
      var view = new ProjectsShowcase.Views.Project({
        model: project
      });
      this.views.push(view);
      $('#projects-list').append(view.render().el);
    },

    removeAll: function() {
      _.each(this.views, this.removeOne);
    },

    removeOne: function(projectView) {
      projectView.close();
    },

    showAll: function(e) {
      e.preventDefault();
      this.filterProjects('all');
    },

    showActive: function(e) {
      e.preventDefault();
      this.filterProjects('active');
    },

    showInactive: function(e) {
      e.preventDefault();
      this.filterProjects('inactive');
    },

    filterProjects: function(filterBy) {
      ProjectsShowcase.projectsRouter.navigate('projects?filter=' + filterBy, { trigger: true });
    },

    newProject: function(e) {
      e.preventDefault();
      ProjectsShowcase.projectsRouter.navigate('projects/new', { trigger: true });
    },

    onClose: function() {
      this.removeAll();
    }


  });

})();
