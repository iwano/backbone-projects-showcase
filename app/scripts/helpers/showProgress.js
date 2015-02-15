Handlebars.registerHelper('showProgress', function(total, current) {

  return (current * 100 / total) + '%';
});
