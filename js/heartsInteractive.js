$(function(){

  function x(d) { return d.x; }
  function y(d) { return d.y; }

  var margin = {top: 10, right: 50, bottom: 50, left: 50},
  width = Math.min(960, innerWidth) - margin.left - margin.right,
  height = Math.min(500, innerHeight) - margin.bottom - margin.top;

  var svg = d3.select("#svgSnowHearts")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .style("background-color", "white")
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .on("mouseover", updateBrush)
    .on("mouseout", function(){
      clearInterval(myPlotInterval);
    });

  svg
    .append("rect")
    .attr("width", width)
    .attr("height", height)
    .attr("class", "snowHearts")
    .attr("fill", "none")
    .attr("transform",  "translate(" + margin.left + "," + margin.top + ")")
    .on("ontouchstart" in document ? "touchmove" : "mousemove", plotHeart);


  // Brush
  var x = d3.scale.linear()
    .domain([0, 100])
    .range([0, width])
    .clamp(true);

  var brush = d3.svg.brush()
    .x(x)
    .extent([100, 100])
    .on("brush", updateBrush);

  var myPlotInterval;

  function updateBrush(){
    var value = brush.extent()[0];
    
    if (d3.event.sourceEvent) { // not a programmatic event
      value = x.invert(d3.mouse(this)[0]);
      brush.extent([value, value]);
    }
    handle.attr("cx", x(value));      
    clearInterval(myPlotInterval);
    myPlotInterval = setInterval(plotHeart, Math.floor(100-value+1));
  }

  // slider.select(".background")
  //     .attr("height", height);

  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0 " + height + ")")
    .attr("z-index", "10")
    .attr("fill", "black")
    .call(d3.svg.axis()
          .scale(x)
          .orient("bottom")
          .tickFormat(function(d) { return d; })
          .tickSize(0)
          .tickPadding(12)
          // .attr("dy", "-1em")
          // .text("Speed of creation")
         )
    .append("text")
    .attr("x", x(85))
    .attr("dy", "-1em")
    .style("text-anchor", "start")
    .text("Speed of Creation of the Hearts")
    .select(".domain")
    .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
    .attr("class", "halo");

  var slider = svg.append("g")
    .attr("class", "slider")
    .call(brush);

  slider.selectAll(".extent,.resize")
    .remove();

  slider.select(".background")
    .attr("height", height);

  var handle = slider.append("circle")
    .attr("class", "handle")
    .attr("transform", "translate(0," + height + ")")
    .attr("r", 9);

  // Heart
  function heartStr(d){                
    return ["M" + d.x + " " + (+d.y - 15),
            "c 3 -30 10 -35 20 -40",
            "s 30 -20 20 -35",
            "q -13 -15 -30 0",
            "q -10 10 -10 25",
            "q 0 -15 -10 -25",
            "s -17 -15 -30 5",
            "s 2 25 10 30",
            "s 30 10 30 40",
            "Z"].join();
  }

  var i = 0;
  var j = 0;

  function translate(d, a){
    return "translate(" + a*d.x + "," + a*(d.y - 60) + ")";
  }

  function scaleFromCenter(d, scaleFact, rotFact) {
    return translate(d, a = 1) + "rotate(" + rotFact +") scale(" + scaleFact + ")" + 
      translate(d, a = -1);
  }


  function plotHeart() {
    
    // var m = d3.mouse(this);
    var m = [Math.random()*width, Math.random()*height];
    var hearts = d3.select("#svgSnowHearts g");
    var dat = {"x" : m[0] , "y" : m[1]};
    var angle = Math.random()*360;
    
    hearts.insert("path", "rect")
      .attr("transform", 
            function() {
              return scaleFromCenter(dat, 0.1, angle);
            })
      .attr("d", function(){return heartStr(dat);})
      .attr("stroke", d3.hsl((++i % 360), 1, 
                             0.45 + (++j % 10)/100))
      .attr("stroke-width", 1.5)
      .attr("fill", "none")
      .transition()
      .duration(4000)
      .ease(Math.log)
      .attr("transform", function() {
        return scaleFromCenter(dat, 1, angle-Math.random()*60+30);})
      .style("stroke-opacity", 1e-6)
      .remove();
    
    handle.attr("stroke", d3.hsl((i % 360), 1, 
                                 0.45 + (j % 10)/100));

    d3.event.preventDefault();
  }

  // slider.call(brush.event);

})
