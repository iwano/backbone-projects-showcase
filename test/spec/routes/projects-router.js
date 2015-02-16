'use strict';

(function () {
  beforeEach(function() {
    this.router = new ProjectsShowcase.Routers.ProjectsRouter();
    try {
      Backbone.history.start({ silent:true });
    } catch(e) {}
  });

  describe('when instantiated', function() {
    it('eager loads the projects collection', function() {
      expect(ProjectsShowcase.projects)
        .toBeDefined();
      expect(ProjectsShowcase.projects.length)
        .toEqual(30);
    });
  });

  describe('navigating to projects list page', function() {
    describe('with path /', function() {
      it('it constructs the projects list view correctly', function() {
        this.router.navigate('', true);

        expect(ProjectsShowcase.projectsView)
          .toBeDefined();
        expect(ProjectsShowcase.projectsView.orderBy)
          .toEqual('id');
        expect(ProjectsShowcase.projectsView.order)
          .toEqual('ASC');
        expect(ProjectsShowcase.projectsView.filterBy)
          .toEqual('all');
      });
    });

    describe('with path /products', function() {
      it('it constructs the projects list view correctly', function() {
        this.router.navigate('/products', true);

        expect(ProjectsShowcase.projectsView)
          .toBeDefined();
        expect(ProjectsShowcase.projectsView.orderBy)
          .toEqual('id');
        expect(ProjectsShowcase.projectsView.order)
          .toEqual('ASC');
        expect(ProjectsShowcase.projectsView.filterBy)
          .toEqual('all');
      });
    });

    describe('with path /projects?filter=active&sort=id&order=ASC', function() {
      it('it constructs the projects list view correctly', function() {
        this.router.navigate('projects?filter=active&sort=id&order=ASC', true);

        expect(ProjectsShowcase.projectsView)
          .toBeDefined();
        expect(ProjectsShowcase.projectsView.orderBy)
          .toEqual('id');
        expect(ProjectsShowcase.projectsView.order)
          .toEqual('ASC');
        expect(ProjectsShowcase.projectsView.filterBy)
          .toEqual('active');
      });
    });

    describe('with path /projects?filter=inactive&sort=end_date&order=DESC', function() {
      it('it constructs the projects list view correctly', function() {
        this.router.navigate('projects?filter=inactive&sort=end_date&order=DESC', true);

        expect(ProjectsShowcase.projectsView)
          .toBeDefined();
        expect(ProjectsShowcase.projectsView.orderBy)
          .toEqual('end_date');
        expect(ProjectsShowcase.projectsView.order)
          .toEqual('DESC');
        expect(ProjectsShowcase.projectsView.filterBy)
          .toEqual('inactive');
      });
    });
  });

  describe('navigating to a product details page', function() {
    describe('first of collection', function() {
      it('it constructs the project details view correctly', function() {
        this.router.navigate('projects/1', true);

        expect(ProjectsShowcase.currentProjectView)
          .toBeDefined();
        expect(ProjectsShowcase.currentProjectView.model.get('name'))
          .toEqual('CS - Recruitment');
        expect(ProjectsShowcase.currentProjectView.previous)
          .toBeUndefined();
        expect(ProjectsShowcase.currentProjectView.next)
          .toEqual(2);
      });
    });

    describe('last of collection', function() {
      it('it constructs the project details view correctly', function() {
        this.router.navigate('projects/30', true);

        expect(ProjectsShowcase.currentProjectView)
          .toBeDefined();
        expect(ProjectsShowcase.currentProjectView.model.get('name'))
          .toEqual('Watchers on the Wall');
        expect(ProjectsShowcase.currentProjectView.previous)
          .toEqual(29);
        expect(ProjectsShowcase.currentProjectView.next)
          .toBeUndefined();
      });
    });
  });

  describe('navigating to the new project page', function() {
    it('it constructs the project details view correctly', function() {
      this.router.navigate('projects/new', true);

      expect(ProjectsShowcase.currentProjectView)
        .toBeDefined();
      expect(ProjectsShowcase.currentProjectView.model.attributes)
        .toEqual({ total_steps: 0, current_step: 0, active: false });
    });
  });


  })();
