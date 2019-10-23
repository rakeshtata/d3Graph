import * as d3 from 'd3';
const PieCharAction = {
  chart : (start) => {
    d3.select("svg").selectAll("*").remove();


    const MAX_COUNT = 20;
    var i = 0;

    var width = 450;
    var height = 450;
    var margin = 40;


  var radius = Math.min(width, height) / 2 - margin;


var data = {a: 10, b: 10, c:10, d:10, e:10,f:10}
let colArr = ["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56","#7b6888"];




  function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  function draw(data) {

      var svg = d3.select("svg")
          .attr("width", width)
          .attr("height", height)
          .append("g")
          .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

      // Create dummy data


      var pie = d3.pie()
        .value(function(d) {return d.value; })
      var data_ready = pie(d3.entries(data))
      svg.selectAll("*").remove();

      var color = d3.scaleOrdinal()
        .domain(data)
        .range(shuffle(colArr))
      svg
        .selectAll('whatever')
        .data(data_ready)
        .enter()
        .append('path')
        .attr('d', d3.arc()
          .innerRadius(10)
          .outerRadius(radius)
        )
        .attr('fill', function(d){ return(color(d.data.key)) })
        .attr("stroke", "black")
        .style("stroke-width", "2px")
        .style("opacity", 0.7)
  }


    function animate(){
      draw(data);
      processData();
    }

    function initSetTimeout(callback){
        setTimeout(callback, 10)
    }

    function processData(){
        i = i + 0.1;


        if(i<MAX_COUNT && start)
            initSetTimeout(animate.bind());
    }

    processData();
  }



}

  export default PieCharAction;
