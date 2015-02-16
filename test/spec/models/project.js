'use strict';

(function () {
  describe('Project model', function() {

    describe('when instantiated', function() {

      it('should have default values', function() {
        var project = new ProjectsShowcase.Models.Project();
        expect(project.attributes)
          .toEqual({ total_steps: 0, current_step: 0, active: false });
      });

      it('should be invalid', function() {
        var project = new ProjectsShowcase.Models.Project({});
        expect(project.isValid())
          .toEqual(false);
      });

    });

    describe('validations', function() {
      var project, eventSpy;
      beforeEach(function() {
        project = new ProjectsShowcase.Models.Project();
        eventSpy = sinon.spy();
        project.bind('invalid', eventSpy);
      });

      describe('when saving without name', function() {
        it('returns the correct error message', function() {
          project.save();

          expect(eventSpy.calledOnce).toBeTruthy();
          expect(eventSpy.calledWith(
            project,
            'Project must have a name'
          )).toBeTruthy();
        });
      });

      describe('when saving without description', function() {
        it('returns the correct error message', function() {
          project.save({ name: 'test' });

          expect(eventSpy.calledOnce).toBeTruthy();
          expect(eventSpy.calledWith(
            project,
            'Project must contain a description'
          )).toBeTruthy();
        });

      });
      describe('when saving without description', function() {
        it('returns the correct error message', function () {
          project.save({ name: 'test', description: 'awesome project' });

          expect(eventSpy.calledOnce).toBeTruthy();
          expect(eventSpy.calledWith(
            project,
            'Project must have an owner'
          )).toBeTruthy();
        });
      });
    });

  });
})();
