// Javascript file for final project
// Authors: Eva Grench, Ethan Cassel-Mace, Chris Tordi
// Date: 11/19/18
var attributesToShow = [];

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

$(document).ready(function() {
  $('.form-check-input').change(function() {
      scanCheckBoxes($(this));
  });
});

function scanCheckBoxes(attributeID) {
    if (attributeID.is(":checked") && attributesToShow.length < 6) {
        attributesToShow.push(attributeID.val());
        $(".attribute-list").append("<p id=" + attributeID.val() + ">" + $(attributeID).attr("name") + "</p>")
    } else if (attributesToShow.length == 5) {
        disableSubmitButton()
    } else {
        var index = attributesToShow.indexOf(attributeID.val());
        if (index !== -1) attributesToShow.splice(index, 1);
        $("#" + attributeID.val()).remove();
    }
}

function disableSubmitButton() {
  console.log('here')
}

function enableSubmitButton() {
  console.log('here')
}

function submitAttributes() {
    urlString = "http://localhost:5000";
    for (var i = 0; i < attributesToShow.length; i++) {
      urlString = urlString + "/" + attributesToShow[i]
    }
    window.location.replace(urlString);
}
