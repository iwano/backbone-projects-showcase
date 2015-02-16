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

    comparator: function (m) {
      if (this.orderBy === 'owner') {
        return m.get(this.orderBy).name;
      }
      return m.get(this.orderBy);
    },

    // taken from http://stackoverflow.com/questions/5013819/reverse-sort-order-with-backbone-js/14737932#14737932
    sortBy: function (iterator, context) {
      var obj       = this.models,
          direction = this.order;

      return _.pluck(_.map(obj, function (value, index, list) {
        return {
          value: value,
          index: index,
          criteria: iterator.call(context, value, index, list)
        };
      }).sort(function (left, right) {
        // swap a and b for reverse sort
        var a = direction === "ASC" ? left.criteria : right.criteria,
          b = direction === "ASC" ? right.criteria : left.criteria;

        if (a !== b) {
          if (a > b || a === void 0) return 1;
          if (a < b || b === void 0) return -1;
        }
        return left.index < right.index ? -1 : 1;
      }), 'value');
    },

    setSortField: function (orderBy, order) {
      this.orderBy = orderBy;
      this.order = order;
    },

    model: ProjectsShowcase.Models.Project

  });

})();
