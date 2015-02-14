Handlebars.registerHelper('ownerImage', function(image) {
  var url = image ? image : 'images/avatar.svg';

  return '<img src=' + url + ' class=\'owner-image\'>';
});
