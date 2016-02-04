"use strict";

// William Parker, Feb 2016, All rights reserved.

function translateHeroData(heroesSelected) {
	var lines = [];
  _.each(data.heroes, function(hero, hi) {
  	if (!heroesSelected[hi]) { return; }
    var lineData = [];
    var i=0;
    while(true) {
      i += 1;
      // The only interesting levels are break points every 25 levels and at level 10.
      // linear interpolation should work for everything else.
      if (!(i == 1 || i == 9 || i == 10 || ((i % 25) == 24 && (i < 100 || i > 175)) || (i % 25) == 0)) {
        continue;
      }

    	var cost = hero.baseCost * (Math.pow(1.07, i) - 1) / 0.07;
      var m = 1;
      if (i >= 10 && hero.multipliers.length >= 1) { m = hero.multipliers[0]; }
      if (i >= 25 && hero.multipliers.length >= 2) { m = hero.multipliers[1]; }
      if (i >= 50 && hero.multipliers.length >= 3) { m = hero.multipliers[2]; }
      if (i >= 75 && hero.multipliers.length >= 4) { m = hero.multipliers[3]; }
      if (i >= 100 && hero.multipliers.length >= 5) { m = hero.multipliers[4]; }
      if (i >= 125 && hero.multipliers.length >= 6) { m = hero.multipliers[5]; }
      
      var dps = hero.baseAttack * i * m;
      if (i >= 200) {
      	dps *= Math.pow(4, Math.floor((i-175)/25))
      }
      dps *= Math.pow(10/4, Math.floor(i/1000));

      // 5x bonus levels for rangers from levels 525-725
      if (hi >= 25 && i >= 525) {
        dps *= Math.pow(5/4, Math.min((i-500)/25, 9))
      }
      
    	lineData.push({cost: Math.log10(cost), dps: Math.log10(dps), level: i, heroIndex: hi});
      
      if (cost >= 1e200) { break; }

    }
    lines.push({heroIndex: hi, name: hero.name, lineData: lineData});
    
  });
  
  return lines;
}

// D3 CONTROL
function redraw(d3Context, scope) {
  var heroData = scope.heroData;
            
  // Make transitions
  d3Context.svg.select(".x-axis")
    .call(d3Context.xAxis);
  d3Context.svg.select(".y-axis")
    .call(d3Context.yAxis);
  
  d3Context.svg.selectAll("path.line")
    .attr("d", function(d) { return d3Context.line(d.lineData); })

  var scale = d3.event ? d3.event.scale : d3Context.lastScale;
  d3Context.lastScale = scale;

  d3Context.svg.selectAll("g.dot")
    .selectAll("circle")
    .attr("cx", function(d) { return d3Context.xScale(d.cost); })
    .attr("cy", function(d) { return d3Context.yScale(d.dps); })
    .attr("r", 0.2*scale);

  var shoveRight = scale * 0.5;
  var shoveDown = scale * 0.1;
  d3Context.svg.selectAll("g.level")
    .selectAll("text")
    .attr("x", function(d) { return d3Context.xScale(d.cost) + shoveRight; })
    .attr("y", function(d) { return d3Context.yScale(d.dps) + shoveDown; })
    .style("visibility", scale >= 5 ? "visible" : "hidden")
}

function resetSelections(d3Context, scope) {
  var heroData = scope.heroData;

  d3Context.svg.selectAll("path.line").remove();
  var heroes = d3Context.svg.selectAll("path.line")
    .data(heroData)
    .enter()
    .append("path")
    .attr("class", "line")
    .style("stroke", function(d) { return d3Context.color(d.heroIndex) });

  d3Context.svg.selectAll("g.dot").remove();
  d3Context.svg.selectAll("g.dot")
    .data(heroData)
    .enter()
    .append("g")
    .attr("class", "dot")
    .selectAll("circle")
    .data(function(d) { return d.lineData; })
    .enter()
    .append("circle")
    .style("stroke", function(d) { return "#000"; })

  d3Context.svg.selectAll("g.level").remove();
  d3Context.svg.selectAll("g.level")
    .data(heroData)
    .enter()
    .append("g")
    .attr("class", "level")
    .selectAll("text")
    .data(function(d) { return d.lineData; })
    .enter()
    .append("text")
    .attr("font-size", "8px")
    .text(function(d) { return d.level; });

  d3Context.svg.selectAll("text.legend").remove();
  d3Context.svg.selectAll("text.legend")
    .data(heroData)
    .enter()
    .append("text")
    .attr("class", "legend")
    .attr("font-size", "14px")
    .style("stroke", function(d) { return d3Context.color(d.heroIndex) })
    .text(function(d) { return d.name; })
    .attr('x', 10)
    .attr('y', function(d, i) { return 14*i + 12; });

}

function setup(scope) {
	var d3Context = {};

	var svg = d3Context.svg = d3.select("#svg-div")
		.append("svg")
		.attr("width", data.width + 2*data.margin)
		.attr("height", data.height + 2*data.margin)
		.append("g")
		.attr("transform", "translate(" + data.margin + "," + data.margin + ")");
  
  d3Context.xScale = d3.scale.linear()
    .range([0, data.width])
    .domain([0, 120]);

  d3Context.yScale = d3.scale.linear()
    .range([data.height, 0])
    .domain([0, 100]);

  d3Context.zoom = d3.behavior.zoom()
   .x(d3Context.xScale)
   .y(d3Context.yScale)
   .scaleExtent([1, 500])
   .on("zoom", function() { redraw(d3Context, scope); });

  d3Context.xAxis = d3.svg.axis()
    .scale(d3Context.xScale)
    .orient("bottom")
    .ticks(20);
  d3Context.yAxis = d3.svg.axis()
    .scale(d3Context.yScale)
    .orient("left")
    .ticks(16);
            
  d3Context.color = d3.scale.category10();
  
  d3Context.svg.append("svg:rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("height", data.height)
    .attr("width", data.width)
    .attr("fill", "#E6E6E6")
    .call(d3Context.zoom);

  svg.append("g")
    .attr("class", "x-axis")
    .attr("transform", "translate(0," + data.height + ")")
    .call(d3Context.xAxis);
  svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", data.width / 2)
    .attr("y", data.height - 6)
    .text("Log(Gold Cost)");

  svg.append("g")
    .attr("class", "y-axis")
    .call(d3Context.yAxis);
  svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("x", -data.height / 2)
    .attr("y", 16)
    .attr("transform", "rotate(-90)")
    .text("Log(DPS)");
  
  d3Context.line = d3.svg.line()
    .x(function(d) { return d3Context.xScale(d.cost); })
    .y(function(d) { return d3Context.yScale(d.dps); });
        
  d3Context.lastScale = 1; // Hack

  return d3Context;
}

// ANGULAR CONTROLLER
function CHCtrl($scope) {
  var d3Context = setup($scope);
	$scope.ui = {
    heroesSelected: {5: true, 26: true}
  };
  
  $scope.heroes = data.heroes;
  
  $scope.reselect = function() { 
    $scope.heroData = translateHeroData($scope.ui.heroesSelected);
    resetSelections(d3Context, $scope);
    redraw(d3Context, $scope);
  }
  $scope.reselect();
}
