'use strict';

Handlebars.registerHelper('isFilterActive', function(currentFilter, filter) {

  return currentFilter === filter ? "checked='true'" : '';
});
