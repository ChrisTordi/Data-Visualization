// Javascript file for final project
// Authors: Eva Grench, Ethan Cassel-Mace, Chris Tordi
// Date: 11/19/18
var attributesToShow = [];
var checkedBoxes = 0;

var originalNames = ['Gender',
                   'JobSatisfaction',
                   'ConvertedSalary',
                   'FormalEducation',
                   'CompanySize',
                   'Hobby',
                   'SkipMeals',
                   'HoursComputer',
                   'HoursOutside',
                   'OpenSource',
                   'Age',
                   'RaceEthnicity',
                   'NumberMonitors',
                   'EthicsChoice',
                   'Exercise'];
var newNames = ['Gender',
                   'Job Satisfaction',
                   'Salary (USD)',
                   'Highest Level of Education',
                   'Company Size',
                   'Codes as a Hobby',
                   'Meals Skipped per Week',
                   'Hours at a Computer per Day',
                   'Hours Outside per Day',
                   'Contributes to Open Source Projects',
                   'Age',
                   'RaceEthnicity',
                   'Number of Monitors used',
                   'Would Work on Unethical Product if Asked',
                   'Exercise per Week'];

var nameMappings = [];
for (let i = 0; i < originalNames.length; i++) {
    nameMappings.push([originalNames[i], newNames[i]]);
}

function constructVis(){
    var nameMap = new Map(nameMappings);
    var newArguments = Array.from(arguments).map( function(key, i) {return nameMap.get(key);});
    var args = Array.prototype.slice.call(newArguments);
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
    // There is space to add another attribute to show
    if (attributeID.is(":checked") && attributesToShow.length < 5) {
        attributesToShow.push(attributeID.val());
        $(".attribute-list").append("<p id=" + attributeID.val() + ">" + $(attributeID).attr("name") + "</p>");
        checkedBoxes++;
        
    // An attribute was unchecked
    } else if (!attributeID.is(":checked")) {
        var index = attributesToShow.indexOf(attributeID.val());
        if (index !== -1) attributesToShow.splice(index, 1);
        $("#" + attributeID.val()).remove();
        checkedBoxes--;
        
    // There is not space to add another attribute, but it was checked
    } else if (attributeID.is(":checked")) {
        checkedBoxes++;
    }
    
    toggleSubmitButtonDisabled(); 
}

function toggleSubmitButtonDisabled() {
    if (checkedBoxes >= 6 || checkedBoxes <= 1) {
        $('#submit-button').prop('disabled', true);
    } else if (checkedBoxes < 6) {
        $('#submit-button').prop('disabled', false);
    }
}

function submitAttributes() {
    urlString = "http://localhost:5000";
    for (var i = 0; i < attributesToShow.length; i++) {
      urlString = urlString + "/" + attributesToShow[i]
    }
    window.location.replace(urlString);
}
