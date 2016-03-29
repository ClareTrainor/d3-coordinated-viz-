
//wrap everything in a self-executing anonymous function to move to local scope
(function(){

//begin script when window loads
window.onload = setMap();

//set up choropleth map
function setMap(){
    //map frame dimensions
    var width = 960,
        height = 500;

    //create new svg container for the map
    var map = d3.select("body")
        .append("svg")
        .attr("class", "map")
        .attr("width", width)
        .attr("height", height);

    //create Albers equal area conic projection for the United States
    var projection = d3.geo.albers()
        .rotate([96, 0])
        .center([0, 38.7])
        .parallels([29.5, 45.5])
        .scale(1070)
        .translate([width / 2, height / 2])

    var path = d3.geo.path()
        .projection(projection);

    //use queue.js to parallelize asynchronous data loading
    d3_queue.queue()
        .defer(d3.csv, "data/FoodData.csv") //load attributes from csv
        .defer(d3.json, "data/Counties.topojson") //load choropleth spatial data
        .await(callback);

    function callback(error, csvData, us){
        // //translate the Counties topojson
        // var usCounties = topojson.feature(us, us.objects.Counties);
        //
        // //add out usCounties to the map
        // var counties = map.append("path")
        //   .datum(usCounties)
        //   .attr("class", "counties")
        //   .attr("d", "path");

            console.log(error);
            console.log(csvData);
            console.log(us);
    };
};

})();
