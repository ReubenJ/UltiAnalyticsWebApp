// Generated by CoffeeScript 1.7.1
'use strict';
angular.module('newBetaApp').filter('hundredths', function() {
  return function(input) {
    if (_(input).isNaN()) {
      return '*';
    } else if (_(input).isNumber()) {
      return parseFloat(input.toFixed(2)).toLocaleString();
    } else {
      return 'NA';
    }
  };
});
