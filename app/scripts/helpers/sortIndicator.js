Handlebars.registerHelper('sortIndicator', function(sort, name, order) {
  if (sort === name && order === 'ASC') {
    return "<i class='icon-sort-indicator'></i>";
  } else if (sort === name && order === 'DESC') {
    return "<i class='icon-sort-indicator--reversed'></i>";
  }
  return '';
});
