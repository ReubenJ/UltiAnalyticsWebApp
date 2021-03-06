// Generated by CoffeeScript 1.8.0
(function() {
  'use strict';
  angular.module('newBetaApp').directive('lineChart', function() {
    return {
      restrict: 'E',
      template: '<chart-key color-scheme="colorMap"></chart-key>',
      scope: {
        lines: '='
      },
      link: function(scope, element, attrs) {
        var color, format, render;
        format = d3.format(",d");
        color = d3.scale.category20c();
        $(window).resize(function() {
          if (scope.lines) {
            return render(scope.lines);
          }
        });
        scope.$watch('lines', function(newData) {
          if (newData) {
            return render(newData);
          }
        });
        return render = function(data) {
          var d3Svg, fontSize, graphLines, height, line, lines, margin, maxXValue, size, width, x, xAxis, y, yAxis;
          scope.colorMap = {};
          element.find('svg').remove();
          size = $(element).parent().width();
          fontSize = 10;
          margin = {
            top: 0,
            right: 80,
            bottom: 20,
            left: 40
          };
          width = size - margin.left - margin.right - fontSize;
          height = size / 2 - margin.top - margin.bottom - fontSize * 2;
          d3Svg = d3.select(element[0]).append('svg').attr("width", width + margin.left + margin.right + fontSize).attr("height", height + margin.top + margin.bottom + fontSize * 2).attr('class', 'line-chart').append("g").attr("transform", "translate(" + margin.left + "," + fontSize + ")");
          x = d3.scale.linear().range([0, width]);
          y = d3.scale.linear().range([height, 0]);
          xAxis = d3.svg.axis().scale(x).orient('bottom');
          yAxis = d3.svg.axis().scale(y).orient('left');
          line = d3.svg.line().interpolate("basis").x(function(d) {
            return x(d.x);
          }).y(function(d) {
            return y(d.y);
          });
          color.domain(d3.keys(data));
          lines = color.domain().map(function(name) {
            return {
              name: name,
              values: data[name]
            };
          });
          maxXValue = 0;
          _.each(lines, function(line) {
            return _.each(line.values, function(value) {
              return maxXValue = _.max([maxXValue, value.x * 1]);
            });
          });
          x.domain([0, maxXValue]);
          y.domain([0, 100]);
          d3Svg.append("g").attr("class", "x axis").attr("transform", "translate( 0, " + height + " )").call(xAxis).append("text").attr("dy", ".71em").attr("transform", "translate( 0, " + margin.bottom + " )").text("Wind Speed (mph)");
          d3Svg.append("g").attr("class", "y axis").call(yAxis).append("text").attr("transform", "rotate(-90)").attr("y", -margin.left).attr("x", -1 * height / 2).attr("dy", ".71em").style("text-anchor", "end").text("Scored (percent)");
          graphLines = d3Svg.selectAll(".line").data(lines).enter().append("g").attr("class", "line");
          graphLines.append("path").attr("class", "line").attr("d", function(d) {
            return line(d.values);
          }).style("stroke", function(d) {
            return color(d.name);
          });
          return graphLines.append("text").datum(function(d) {
            return {
              name: d.name,
              value: d.values[d.values.length - 1]
            };
          }).attr("transform", function(d) {
            return "translate(" + (x(d.value.x)) + ", " + (y(d.value.y)) + " )";
          }).attr("x", 3).attr("dy", ".35em").text(function(d) {
            return d.name;
          });
        };
      }
    };
  });

}).call(this);
