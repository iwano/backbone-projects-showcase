Handlebars.registerHelper('formatDate', function(date, format) {
  return moment(date).format(format);
  return true;
});