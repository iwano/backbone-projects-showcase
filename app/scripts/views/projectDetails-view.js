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
      "click a": "close"
    },

    initialize: function () {
      this.listenTo(ProjectsShowcase.dispatcher, 'cleanProjectDetails', this.close);
      this.listenTo(this.model, 'change', this.render);
      this.render();
    },

    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
    },

    close: function () {
      this.stopListening();
      this.undelegateEvents();
      this.$el.html('');
    }

  });

})();
