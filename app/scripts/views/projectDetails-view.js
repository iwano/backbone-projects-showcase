/*global ProjectsShowcase, Backbone, JST*/

ProjectsShowcase.Views = ProjectsShowcase.Views || {};

(function () {
  'use strict';

  ProjectsShowcase.Views.ProjectDetails = Backbone.View.extend({

    template: JST['app/scripts/templates/projectDetails-template.hbs'],

    el: 'body',

    id: '',

    className: '',

    events: {
      "click a[js-go-back]":          "goBack",
      "click a[js-previous-project]": "showPreviousProject",
      "click a[js-next-project]":     "showNextProject"
    },

    initialize: function (options) {
      this.previous = options.previous;
      this.next = options.next;
      this.listenTo(this.model, 'change', this.render);
      this.render();
    },

    goBack: function(e) {
      e.preventDefault();
      ProjectsShowcase.projectsRouter.navigate('projects', { trigger: true });
    },

    showPreviousProject: function(e) {
      e.preventDefault();
      this.showProject(this.previous);
    },

    showNextProject: function(e) {
      e.preventDefault();
      this.showProject(this.next);
    },

    showProject: function(project) {
      ProjectsShowcase.projectsRouter.navigate('projects/' + project, { trigger: true });
    },

    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
    }

  });

})();
