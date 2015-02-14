/*global ProjectsShowcase, Backbone, JST*/

ProjectsShowcase.Views = ProjectsShowcase.Views || {};

(function () {
  'use strict';

  ProjectsShowcase.Views.ProjectDetails = Backbone.View.extend({

    template: JST['app/scripts/templates/projectDetails-template.hbs'],

    tagName: 'section',

    id: 'project-details',

    className: 'project-details card',

    events: {
      "click a[js-go-back]":             "goBack",
      "click a[js-previous-project]":    "showPreviousProject",
      "click a[js-next-project]":        "showNextProject",
      "click button[js-project-save]":   "save",
      "click button[js-project-edit]":   "edit",
      "click button[js-project-cancel]": "cancel",
      "click h2[js-collapsible]":            "collapseContent"
    },

    initialize: function (options) {
      this.previous = options.previous;
      this.next = options.next;
      this.listenTo(this.model, 'change', this.render);
      this.render();
    },

    goBack: function(e) {
      e.preventDefault();
      ProjectsShowcase.projectsRouter.navigate('projects', { trigger: true });
    },

    showPreviousProject: function(e) {
      e.preventDefault();
      this.previous && this.showProject(this.previous);
    },

    showNextProject: function(e) {
      e.preventDefault();
      this.next && this.showProject(this.next);
    },

    showProject: function(project) {
      ProjectsShowcase.projectsRouter.navigate('projects/' + project, { trigger: true });
    },

    save: function(e) {
      var values = this.form.serializeArray(),
          self   = this;
      this.model.save({
        name:         values[0].value,
        description:  values[1].value,
        owner: {
          name:       values[2].value
        },
        start_date:   values[4].value,
        end_date:     values[5].value,
        total_steps:  values[6].value,
        current_step: values[7].value,
        active:       (values[8] ? true : false)
      }, {success:function(model) {
        e.preventDefault();
        ProjectsShowcase.projects.add(model);
        self.closeForm();
      } });
    },

    edit: function(e) {
      e.preventDefault();
      this.showForm();
    },

    cancel: function(e) {
      e.preventDefault();
      this.closeForm();
    },

    showForm: function() {
      this.$el.addClass('project-details--editing');
    },

    closeForm: function() {
      this.$el.removeClass('project-details--editing');
    },

    collapseContent: function(e) {
      var header = $(e.currentTarget);
      header.next().slideToggle();
      header.find('i').toggleClass('icon-collapsible-toggle--collapsed');
    },

    render: function () {
      this.$el.html(this.template({
        model:    this.model.toJSON(),
        next:     this.next,
        previous: this.previous
      }));
      this.$el.appendTo($("#main-content"));
      if (this.model.isNew()) {
        this.showForm();
      }
      this.form = $("form");

    }

  });

})();
