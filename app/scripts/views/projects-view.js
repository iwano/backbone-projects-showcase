/*global ProjectsShowcase, Backbone, JST*/

ProjectsShowcase.Views = ProjectsShowcase.Views || {};

(function () {
  'use strict';

  ProjectsShowcase.Views.Projects = Backbone.View.extend({

    template: JST['app/scripts/templates/projects-template.hbs'],

    el: 'body',

    id: '',

    className: '',

    events: {},

    initialize: function(){
      this.render();
    },

    render: function () {
      this.$el.html(this.template);
      this.addAll();
    },

    addAll: function() {
      this.collection.each(this.addOne, this);
    },

    addOne: function(project) {
      var project = new ProjectsShowcase.Views.Project({
        model: project
      });
      $('ul').append(project.render().el);
    }

  });

})();
