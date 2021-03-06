// Generated by CoffeeScript 1.8.0
(function() {
  'use strict';
  angular.module('newBetaApp').directive('bubblePie', function() {
    return {
      restrict: 'E',
      template: '<chart-key color-scheme="colorMap"></chart-key>',
      scope: {
        data: '='
      },
      link: function(scope, element, attrs) {
        var color, format, render;
        format = d3.format(",d");
        color = d3.scale.category20c();
        $(window).resize(function() {
          if (scope.data) {
            return render(scope.data);
          }
        });
        scope.$watch('data', function(newData) {
          if (newData) {
            return render(newData);
          }
        });
        return render = function(data) {
          var bubble, bubbles, d3Svg, persister, pie, size;
          scope.colorMap = {};
          element.find('svg').remove();
          size = $(element).parent().width();
          d3Svg = d3.select(element[0]).append('svg').attr('width', size).attr('height', size).attr('class', 'bubble-pie');
          pie = d3.layout.pie().value(function(d) {
            return d.value;
          });
          bubble = d3.layout.pack().sort(null).size([size, size]).padding(5);
          bubbles = d3Svg.selectAll('.bubble').data(bubble.nodes(data).filter(function(d) {
            return !d.children;
          })).enter().append('g').attr('class', 'bubble').attr('transform', function(d) {
            return "translate(" + d.x + "," + d.y + ")";
          });
          bubbles.append('text').attr('dy', '.3em').style('text-anchor', 'middle').text(function(d) {
            return d.playerName.substring(0, d.r / 3);
          });
          persister = {};
          return _.each(bubbles[0], function(bubble) {
            var arc, arcs;
            data = bubble.__data__;
            persister["arc" + data.id] = d3.svg.arc().outerRadius(data.r);
            persister["arcs" + data.id] = d3Svg.selectAll("g.slice" + data.id).data(pie(data.stats)).enter().insert("svg:g", ":first-child").attr("class", "slice" + data.id).attr("transform", "translate( " + data.x + ", " + data.y + ")");
            arc = persister["arc" + data.id];
            arcs = persister["arcs" + data.id];
            arcs.append("svg:path").attr("fill", function(d, i) {
              var tempColor;
              tempColor = color(i);
              if (_.isNaN(d.endAngle)) {
                d.endAngle = 0;
              }
              if (_.isNaN(d.startAngle)) {
                d.startAngle = 0;
              }
              if (d.data.label !== 'Catch') {
                scope.colorMap[d.data.label] = tempColor;
              }
              return tempColor;
            }).attr("d", arc);
            return arcs.append("title").text(function(d, i) {
              return "" + d.value + " " + data.stats[i].label + "s";
            });
          });
        };
      }
    };
  });

}).call(this);
