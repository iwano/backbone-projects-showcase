Handlebars.registerHelper('formatDate', function(date, format) {
  return isNaN(date) ? date : moment(date).format(format);
});
