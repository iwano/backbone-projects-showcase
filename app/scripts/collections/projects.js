/*global ProjectsShowcase, Backbone*/

ProjectsShowcase.Collections = ProjectsShowcase.Collections || {};

(function () {
    'use strict';

    ProjectsShowcase.Collections.Project = Backbone.Collection.extend({

        model: ProjectsShowcase.Models.Project

    });

})();
