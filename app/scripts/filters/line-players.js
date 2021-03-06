// Generated by CoffeeScript 1.8.0
(function() {
  'use strict';
  angular.module('newBetaApp').filter('linePlayers', function() {
    return function(input) {
      if (input.length <= 1) {
        return "" + (input.join()) + " played";
      } else {
        return "" + (input.slice(0, -1).join(', ')) + " and " + (_.last(input)) + " played together";
      }
    };
  });

}).call(this);
