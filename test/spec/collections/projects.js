'use strict';

(function () {
  describe('Projects collection', function() {

    describe('when instantiated', function() {

      it('should have default orderBy', function() {
        var collection = new ProjectsShowcase.Collections.Project();
        expect(collection.orderBy)
          .toEqual('id');
      });

      it('should have default order', function() {
        var collection = new ProjectsShowcase.Collections.Project();
        expect(collection.order)
          .toEqual('ASC');
      });

    });

    describe('sorting', function() {
      var collection;
      beforeEach(function() {
        collection = new ProjectsShowcase.Collections.Project(ProjectsFixtures);
      });

      describe('by id', function() {
        describe('ASC', function() {
          it('sorts correctly', function () {
            expect(collection.models[0].get('id'))
              .toEqual(1);
          });
        });

        describe('DESC', function() {
          it('sorts correctly', function() {
            collection.setSortField('id', 'DESC');
            collection.sort();
            expect(collection.models[0].get('id'))
              .toEqual(30);
          });
        });
      });

      describe('by name', function() {
        describe('ASC', function() {
          it('sorts correctly', function () {
            collection.setSortField('name', 'ASC');
            collection.sort();
            expect(collection.models[0].get('name'))
              .toEqual('Accounting System Memo');
          });
        });

        describe('DESC', function() {
          it('sorts correctly', function() {
            collection.setSortField('name', 'DESC');
            collection.sort();
            expect(collection.models[0].get('name'))
              .toEqual('Watchers on the Wall');
          });
        });
      });

      describe('by owner', function() {
        describe('ASC', function() {
          it('sorts correctly', function () {
            collection.setSortField('owner', 'ASC');
            collection.sort();
            expect(collection.models[0].get('owner').name)
              .toEqual('Arya Stark');
            expect(collection.models[0].get('id'))
              .toEqual(3);
          });
        });

        describe('DESC', function() {
          it('sorts correctly', function() {
            collection.setSortField('owner', 'DESC');
            collection.sort();
            expect(collection.models[0].get('owner').name)
              .toEqual('Tyrion Lannister');
            expect(collection.models[0].get('id'))
              .toEqual(1);
          });
        });
      });

      describe('by due date', function() {
        describe('ASC', function() {
          it('sorts correctly', function () {
            collection.setSortField('end_date', 'ASC');
            collection.sort();
            expect(collection.models[0].get('name'))
              .toEqual('CS - Recruitment');
            expect(collection.models[0].get('end_date'))
              .toEqual(1424196116000);
          });
        });

        describe('DESC', function() {
          it('sorts correctly', function() {
            collection.setSortField('end_date', 'DESC');
            collection.sort();
            expect(collection.models[0].get('name'))
              .toEqual('Watchers on the Wall');
            expect(collection.models[0].get('end_date'))
              .toEqual(1444240916000);
          });
        });
      });

      describe('by steps', function() {
        describe('ASC', function() {
          it('sorts correctly', function () {
            collection.setSortField('total_steps', 'ASC');
            collection.sort();
            expect(collection.models[0].get('name'))
              .toEqual('Assignment Details 2.0');
            expect(collection.models[0].get('total_steps'))
              .toEqual(1);
          });
        });

        describe('DESC', function() {
          it('sorts correctly', function() {
            collection.setSortField('total_steps', 'DESC');
            collection.sort();
            expect(collection.models[0].get('name'))
              .toEqual('Negotiate With Tywin');
            expect(collection.models[0].get('total_steps'))
              .toEqual(41);
          });
        });
      });

    });

  });
})();
