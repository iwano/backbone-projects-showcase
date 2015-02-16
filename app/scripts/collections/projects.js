/*global ProjectsShowcase, Backbone*/

ProjectsShowcase.Collections = ProjectsShowcase.Collections || {};

(function () {
  'use strict';

  ProjectsShowcase.Collections.Project = Backbone.Collection.extend({

    initialize: function() {
      this.orderBy = 'id';
      this.order   = 'ASC';
    },

    localStorage: new Backbone.LocalStorage('projects'),

    comparator: function(m1, m2) {
      var value1, value2, res;

      if (['name', 'owner', 'end_date', 'total_steps', 'active'].indexOf(this.orderBy) < 0) {
        return m1.get('id');
      } else if (this.orderBy === 'owner') {
        value1 = m1.get('owner').name;
        value2 = m2.get('owner').name;
      } else {
        value1 = m1.get(this.orderBy);
        value2 = m2.get(this.orderBy);
      }

      if (value1 < value2) {
        res = -1;
      } else if (value1 > value2) {
        res = 1;
      } else {
        res = 0;
      }

      if (this.order === 'DESC') {
        res = -res;
      }
      return res;

    },

    model: ProjectsShowcase.Models.Project

  });

})();
