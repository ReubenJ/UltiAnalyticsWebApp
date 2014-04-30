// Generated by CoffeeScript 1.7.1
'use strict';
angular.module('newBetaApp').factory('relocate', [
  '$location', '$routeParams', function($location, $routeParams) {
    var base;
    base = $routeParams.teamId + '/';
    return {
      goTo: function(route, query) {
        return $location.path(base + route + '/' + decodeURIComponent(query));
      }
    };
  }
]);