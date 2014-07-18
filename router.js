var router = {}

exports.get = function(url, controllerAction) {
  router['GET'] = router['GET'] || {};
  router['GET'][url] = controllerAction;
}

exports.resolve = function(request) {
  var controllerAction = router[request.method][request.url];

  if (controllerAction){
    return controllerActionToFunction(controllerAction);
  }
}

var controllerActionToFunction = function(controllerAction) {
  var parts = controllerAction.split('#');
  delete require.cache[require.resolve('./' + parts[0])];
  var module = require('./' + parts[0]);
  return module[parts[1]];
}