'use strict';

/**
 * @ngdoc directive
 * @name logRythmTestApp.directive:barchart
 * @description
 * # barchart
 */
angular.module('logRythmTestApp')
  .directive('barchart', function () {
    return {
      restrict: 'E',
      link: function postLink(scope, element) {
        
        function draw() {
          $(element[0]).empty();
          var margin = {top: 20, right: 20, bottom: 30, left: 40},
              width = element[0].offsetWidth - margin.left - margin.right,
              height = 500 - margin.top - margin.bottom;

          var x = d3.scale.ordinal()
              .rangeRoundBands([0, width], 0.1);

          var y = d3.scale.linear()
              .range([height, 0]);

          var xAxis = d3.svg.axis()
              .scale(x)
              .orient('bottom');

          var yAxis = d3.svg.axis()
              .scale(y)
              .orient('left');

          var svg = d3.select(element[0]).append('svg')
              .attr('width', width + margin.left + margin.right)
              .attr('height', height + margin.top + margin.bottom)
            .append('g')
              .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

          var data = scope.students;

         
          x.domain(data.map(function(d) { return d.name; }));
          y.domain([0, d3.max(data, function(d) { return d.grade; })]);

          svg.append('g')
              .attr('class', 'x axis')
              .attr('transform', 'translate(0,' + height + ')')
              .call(xAxis);

          svg.append('g')
              .attr('class', 'y axis')
              .call(yAxis)
            .append('text')
              .attr('transform', 'rotate(-90)')
              .attr('y', 6)
              .attr('dy', '.71em')
              .style('text-anchor', 'end')
              .text('Grades');

          svg.selectAll('.bar')
              .data(data)
            .enter().append('rect')
              .attr('class', 'bar')
              .attr('x', function(d) { return x(d.name); })
              .attr('width', x.rangeBand())
              .attr('y', function(d) { return y(d.grade); })
              .attr('height', function(d) { return height - y(d.grade); });

           
        } // end of draw funciton

        scope.$watch('students', function(newValue){
          if (newValue.length) {
            draw(); 
          }
        }, true);
        
      }
    };
  });
