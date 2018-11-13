// Javascript file for final project
// Authors: Eva Grench, Ethan Cassel-Mace, Chris Tordi
// Date: 11/19/18

function constructVis(){
    var args = Array.prototype.slice.call(arguments);
    var chart = d3.parsets()
          .dimensions(args);

    var vis = d3.select("#parsets").append("svg")
        .attr("width", chart.width())
        .attr("height", chart.height());

    d3.csv("/static/output_data.csv", function(error, csv) {
      vis.datum(csv).call(chart);
    });

}
