// $(function(){
//   $("#intro-wrapper-prof").load("html/DavidPham_cv_workXp.html"); 
// });


$(function(){
  d3.csv('data/workXp.csv', function(error, csvData){
    var jobDesc = {};
    var tooltipJob = d3.select("body")
	  .append("div")
    .attr("class", "d3-tip")
	  .style("position", "absolute")
	  .style("z-index", "10")
	  .style("visibility", "hidden");

    d3.json("data/workXpDesc.json", function(collection){
      for (var v in collection){
        v = collection[v];
        jobDesc[v.company] = v.htmlText.map(function(d){
          return '<div class="fa fa-check-circle-o"> ' + d + '</div>';
        }).join("<br>");
      };
    })

    d3.select("#intro-wrapper-prof")
      .attr("class", "container")
      .append("span").append("div")
      .attr("class", "feature-list")
      .append("span") //hack to append two div
      .append("div")
      .attr("class", "row")
              
    var xp = d3.select("#intro-wrapper-prof span div span div").selectAll("div")
      .data(csvData)
     .enter().append("div")
      .attr("class", "6u")
      .append("section");
    
    xp.append("h3")
      .attr("class", function(d){
        return "fa " + d.logo;
      })
      .attr("id", function(d) {return d.company_name;})
      .html(function(d){
        return "<a href=" + d.website +">"+ d.company_name + '</a>, ' + d.location;
        });
    
    xp.append("p")
      .each(function(d){
        d3.select(this).append("span")
          .attr("class", "fa fa-search left cmti-10")
          .html(function(d) {return " "+ d.job_dsc + " <br>"; });
        
       d3.select(this).append("span")
          .attr("class", "fa fa-calendar right cmbx-10")
          .html(function(d) {return " " + d.job_date + "<br>";})
        d3.select(this).append("br")
      });

    xp.append("br")
    xp.append("p")    
      .attr("class", "fa fa-star")
      .html(function(d){
        return " Acquired skills: " + d.gain_skills;
      });
    xp.append("hr").append("br");
    
    var addToolTip = function(g){
      g.on("mouseover", 
         function(d){
           tooltipJob.html(jobDesc[d.company_name]);      
           return tooltipJob.style("visibility", "visible");})
	    .on("mousemove", function(){return tooltipJob.style("top", (d3.event.pageY-100)+"px").style("left",(d3.event.pageX+20)+"px");})
	    .on("mouseout", 
          function(){
            return tooltipJob.style("visibility", "hidden");
          });
    };

    addToolTip(xp.selectAll("h3"));
    
  });
});
