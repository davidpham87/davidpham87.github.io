$(function(){
  var titles = d3.selectAll("div .title");

  // <div class="title" id="head-profesionnal-Xp"> 
  //   <h1 class="fa fa-briefcase"> Professional Experience</h1>
  titles = titles[0].filter(function(d) {return d.id != '';});

  var data = titles.map(function(d){
    var id = d.id;
    var c =  d.children[0];
    return {"id": id, "class" : c.className, "text" : c.innerText};
  })

  d3.select('#navUl').selectAll("li")
    .data(data)
   .enter()
    .append("li")
    .html(
      function(d) {
        return '<a href="#' + d.id + '" class="' + d.class + '"> ' + d.text +'</a>';}
    );

//     .append("li")
//     .append("a")
//     .attr("href", function(d) {return "#"+ d.id})
//     .attr("class", 
// //  function(d) { return "button button-style3 button-big " + d.class;})
//           function(d) { return "button " + d.class;})
});
