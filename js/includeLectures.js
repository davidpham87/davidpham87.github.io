$(function(){
  d3.csv('data/grades.csv', function(error, csvData){

    var educDesc = d3.map();    

    var tooltip = d3.select("body")
	  .append("div")
    .attr("class", "d3-tip")
	  .style("position", "absolute")
	  .style("z-index", "10")
	  .style("visibility", "hidden");
   
   var educData = d3.nest()
      .key(function(d) {return d.school;})
      .entries(csvData);

    /* The name of the school is changed because of 
       the id inside the index html file*/
   educData.forEach(function(x){ 
     educDesc["ed-"+x.key] = '<div align="center"><font color="#C82536"> Lectures </font></div> <br>' +
       x.values.map(function(d){ 
         return '<div class="fa fa-check-circle-o"> ' + d.lectures + '</div>';
       }).join("<br>");
   })

   var addToolTip = function(g){
      g.on("mouseover", 
         function(d){
           tooltip.html(educDesc[this.id]);      
           return tooltip.style("visibility", "visible");})
	    .on("mousemove", function(){return tooltip.style("top", (d3.event.pageY-100)+"px").style("left",(d3.event.pageX+20)+"px");})
	    .on("mouseout", 
          function(){
            return tooltip.style("visibility", "hidden");
          });
    };
    
    educ = d3.select('#education-list');
    addToolTip(educ.selectAll("h3"));

})})
