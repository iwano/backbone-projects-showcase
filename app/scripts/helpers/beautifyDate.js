'use strict';

Handlebars.registerHelper('beautifyDate', function(date, format) {
  return isNaN(date) ? moment(date, 'DD/MM/YYYY').format(format) : moment(date).format(format);
});
