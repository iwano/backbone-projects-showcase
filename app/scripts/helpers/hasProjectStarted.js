'use strict';

Handlebars.registerHelper('hasProjectStarted', function(total, step) {

  if (step > 0 && total > 0) {
    return 'progress__current-step';
  }
});

