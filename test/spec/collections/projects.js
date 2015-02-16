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

  });
})();
