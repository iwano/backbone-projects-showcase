/*global ProjectsShowcase, Backbone, JST*/

ProjectsShowcase.Views = ProjectsShowcase.Views || {};

(function () {
  'use strict';

  ProjectsShowcase.Views.ProjectDetails = Backbone.View.extend({

    template: JST['app/scripts/templates/projectDetails-template.hbs'],

    tagName: 'section',

    id: 'project-details',

    className: 'project-details',

    events: {
      "click a[js-go-back]":             "goBack",
      "click a[js-previous-project]":    "showPreviousProject",
      "click a[js-next-project]":        "showNextProject",
      "click button[js-project-save]":   "save",
      "click button[js-project-edit]":   "edit",
      "click button[js-project-cancel]": "cancel"
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
      this.showProject(this.previous);
    },

    showNextProject: function(e) {
      e.preventDefault();
      this.showProject(this.next);
    },

    showProject: function(project) {
      ProjectsShowcase.projectsRouter.navigate('projects/' + project, { trigger: true });
    },

    save: function(e) {
      e.preventDefault();
      this.model.save({
        name:         this.nameInput.val(),
        description:  this.descriptionInput.val(),
        owner: {
          name:       this.ownerNameInput.val()
        },
        start_date:   this.startsInput.val(),
        end_date:     this.endsInput.val(),
        total_steps:  this.totalStepsInput.val(),
        current_step: this.currentStepInput.val(),
        active:       this.activeInput.val()
      });
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

    render: function () {
      $("#main-content").html(
        this.$el.html(this.template(this.model.toJSON()))
      );
      if (this.model.isNew()) {
        this.showForm();
      }
      this.nameInput        = $("input[name='name']");
      this.descriptionInput = $("textarea[name='description']");
      this.ownerNameInput   = $("input[name='owner_name']");
      this.startsInput      = $("input[name='start_date']");
      this.endsInput        = $("input[name='end_date']");
      this.totalStepsInput  = $("input[name='total_steps']");
      this.currentStepInput = $("input[name='current_step']");
      this.activeInput      = $("input[name='active']");
    }

  });

})();
