/*global ProjectsShowcase, Backbone, JST*/

ProjectsShowcase.Views = ProjectsShowcase.Views || {};

(function () {
  'use strict';

  ProjectsShowcase.Views.Projects = Backbone.View.extend({

    template: JST['app/scripts/templates/projects.hbs'],

    el: 'body',

    id: '',

    className: '',

    events: {},

    initialize: function(){
      this.render();
    },

    render: function () {
      this.$el.html(this.template);
      this.renderCollection();
    },

    renderCollection: function() {
      this.collection.each(function(project){
        this.renderProject(project);
      }, this);
    },

    renderProject: function(project) {
      var project = new ProjectsShowcase.Views.Project({
        model: project
      });
      $('ul').append(project.render().el);
    }

  });

})();
