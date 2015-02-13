/*global ProjectsShowcase, Backbone*/

ProjectsShowcase.Models = ProjectsShowcase.Models || {};

(function () {
    'use strict';

    ProjectsShowcase.Models.Project = Backbone.Model.extend({

        initialize: function() {
        },

        defaults: {
        },

        validate: function(attrs, options) {
        },

        parse: function(response, options)  {
            return response;
        }
    });

})();
