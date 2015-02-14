/*global ProjectsShowcase, Backbone*/

ProjectsShowcase.Models = ProjectsShowcase.Models || {};

(function () {
  'use strict';

  ProjectsShowcase.Models.Project = Backbone.Model.extend({

    initialize: function() {
      this.on('invalid', function(model, error) {
        console.log(error);
      });
    },

    localStorage: new Backbone.LocalStorage('projects'),

    defaults: {
      total_steps: 0,
      current_step: 0,
      active: false
    },

    validate: function(attrs, options) {
      if (!attrs.name) {
        return 'Project must have a name';
      }

      if (!attrs.description) {
        return 'Project must contain a description';
      }

      if (!attrs.owner || (attrs.owner && !attrs.owner.name)) {
        return 'Project must have an owner';
      }
    },

    parse: function(response, options) {
      return response;
    }
  });

})();
