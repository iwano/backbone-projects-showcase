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
      "click a[js-go-back]": "goBack"
    },

    initialize: function () {
      this.listenTo(this.model, 'change', this.render);
      this.render();
    },

    goBack: function(e) {
      e.preventDefault();
      ProjectsShowcase.projectsRouter.navigate('projects', { trigger: true });
    },

    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
    }

  });

})();
