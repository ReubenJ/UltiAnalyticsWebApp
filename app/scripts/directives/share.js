// Generated by CoffeeScript 1.7.1
(function() {
  'use strict';
  angular.module('newBetaApp').directive('share', function($routeParams, $location, api, filter, allGames, teamName) {
    return {
      templateUrl: 'includes/partials/share.html',
      restrict: 'E',
      link: function(scope, element, attrs) {
        scope.escapeUrl = window.escape;
        teamName.then(function(response) {
          return scope.teamName = response;
        });
        scope.stopSharing = function() {
          return scope.sharingModalIsOpen = false;
        };
        scope.startSharing = function() {
          var stateType;
          scope.sharingModalIsOpen = true;
          stateType = $location.path().match(/\/[^\/]+\/\w+/)[0].replace(/\/[^\/]+\//, '');
          api.saveState($routeParams.teamId, stateType, JSON.stringify(scope.getSharedData() || {}), function(response) {
            return scope.$apply(function() {
              return scope.shareUrl = "" + window.location.host + "/#/" + $routeParams.teamId + "/share/" + response.type + "/" + response.stateId;
            });
          });
          return FB.init({
            appId: 1442600126018189,
            version: 'v2.0',
            status: true,
            xfbml: true
          });
        };
        return scope.fbShare = function() {
          return FB.ui({
            method: 'share',
            href: scope.shareUrl
          });
        };
      }
    };
  });

}).call(this);
