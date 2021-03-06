// Generated by CoffeeScript 1.8.0
(function() {
  'use strict';
  angular.module('newBetaApp').controller('ShareCtrl', function($scope, $routeParams, $location, api, allGames, filter, savedState) {
    return api.retrieveState($routeParams.teamId, $routeParams.stateId, $routeParams.stateType, function(response) {
      return allGames.then(function(games) {
        var data;
        data = JSON.parse(response.json);
        savedState.set(data);
        filter.onlyInclude(_.reduce(data.gameIds, function(memo, gameId) {
          memo.push(games[gameId]);
          return memo;
        }, []));
        $location.replace();
        return $location.url("" + $routeParams.teamId + "/" + response.type);
      });
    });
  });

}).call(this);
