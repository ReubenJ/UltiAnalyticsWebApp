// Generated by CoffeeScript 1.8.0
(function() {
  'use strict';
  angular.module('newBetaApp').filter('upperCase', function() {
    return function(input) {
      if (_(input).isString()) {
        return input.slice(0, 1).toUpperCase() + input.slice(1);
      }
    };
  });

}).call(this);
