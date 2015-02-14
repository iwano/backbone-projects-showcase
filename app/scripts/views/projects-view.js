/*global ProjectsShowcase, Backbone, JST*/

ProjectsShowcase.Views = ProjectsShowcase.Views || {};

(function () {
  'use strict';

  ProjectsShowcase.Views.Projects = Backbone.View.extend({

    template: JST['app/scripts/templates/projects-template.hbs'],

    tagName: 'section',

    id: 'projects-container',

    className: 'card card--tall-footer',

    events: {
      "click a[js-filter-all]":      "showAll",
      "click a[js-filter-active]":   "showActive",
      "click a[js-filter-inactive]": "showInactive",
      "click a[js-project-new]":     "newProject",
      "click th[js-sort]":           "sortProjects"
    },

    initialize: function(options){
      this.collection.on('sort', this.render, this);
      this.views              = [];
      this.filterBy           = options.filterBy;
      this.order              = options.order;
      this.orderBy            = options.orderBy;
      this.collection.orderBy = this.orderBy;
      this.collection.order   = this.order;
      this.collection.sort();
    },

    render: function () {
      console.log([this.orderBy, this.filterBy, this.order]);
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
      $('tbody').append(view.render().el);
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
      ProjectsShowcase.projectsRouter.navigate('projects?filter=' + filterBy + '&sort=' + this.orderBy + '&order=' + this.order, { trigger: true });
    },

    sortProjects: function(e) {
      e.preventDefault();
      var orderBy = $(e.currentTarget).data('sort');
      if (orderBy === this.orderBy) {
        this.order = this.order === 'ASC' ? 'DESC' : 'ASC';
      } else {
        this.orderBy = orderBy;
      }
      ProjectsShowcase.projectsRouter.navigate('projects?filter=' + this.filterBy + '&sort=' + this.orderBy + '&order=' + this.order, { trigger: true });
    },

    newProject: function(e) {
      e.preventDefault();
      ProjectsShowcase.projectsRouter.navigate('projects/new', { trigger: true });
    },

    onClose: function() {
      this.collection.off();
      this.removeAll();
    }


  });

})();
