/*global ProjectsShowcase, Backbone*/

ProjectsShowcase.Collections = ProjectsShowcase.Collections || {};

(function () {
  'use strict';

  ProjectsShowcase.Collections.Project = Backbone.Collection.extend({

    initialize: function() {
      this.orderBy = 'all';
    },

    localStorage: new Backbone.LocalStorage("projects"),

    comparator: function(m) {
      if(this.orderBy == 'active') {
        return m.get('active');
      } else if(this.orderBy == 'inactive') {
        return -m.get('active');
      }
      return m.get('id');
    },

    model: ProjectsShowcase.Models.Project

  });

})();
