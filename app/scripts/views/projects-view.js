/*global ProjectsShowcase, Backbone, JST*/

ProjectsShowcase.Views = ProjectsShowcase.Views || {};

(function () {
  'use strict';

  ProjectsShowcase.Views.Projects = Backbone.View.extend({

    template: JST['app/scripts/templates/projects-template.hbs'],

    tagName: 'section',

    id: 'projects-list',

    className: '',

    events: {
      "click a[js-filter-all]":      "showAll",
      "click a[js-filter-active]":   "showActive",
      "click a[js-filter-inactive]": "showInactive"
    },

    initialize: function(){
      this.collection.on('sort', this.render, this);
      this.views = [];
      this.render();
    },

    render: function () {
      debugger;
      $("#main-content").append(
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
      $('ul').append(view.render().el);
    },

    removeAll: function() {
      _.each(this.views, this.removeOne);
    },

    removeOne: function(projectView) {
      projectView.close();
    },

    showAll: function(e) {
      e.preventDefault();
      this.collection.orderBy = 'all';
      this.collection.sort();
    },

    showActive: function(e) {
      e.preventDefault();
      this.collection.orderBy = 'active';
      this.collection.sort();
    },

    showInactive: function(e) {
      e.preventDefault();
      this.collection.orderBy = 'inactive';
      this.collection.sort();
    },

    onClose: function() {
      this.removeAll();
    }


  });

})();
