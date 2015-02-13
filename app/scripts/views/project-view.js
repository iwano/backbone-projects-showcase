/*global ProjectsShowcase, Backbone, JST*/

ProjectsShowcase.Views = ProjectsShowcase.Views || {};

(function () {
  'use strict';

  ProjectsShowcase.Views.Project = Backbone.View.extend({

    template: JST['app/scripts/templates/project-template.hbs'],

    tagName: 'tr',

    id: '',

    className: '',

    events: {
      "click a[js-show-details]": "showDetails"
    },

    initialize: function () {
      this.listenTo(this.model, 'change', this.render);
    },

    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },

    showDetails: function(e) {
      e.preventDefault();
      ProjectsShowcase.projectsRouter.navigate('projects/' + this.model.get('id'), { trigger: true });
    }

  });

})();
