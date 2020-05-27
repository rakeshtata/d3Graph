import * as d3 from 'd3';
const GraphCharts = {
  graph : (event,start) => {
    d3.select("svg").selectAll("*").remove();

    //let _this = this;
    // set the dimensions and margins of the graph
    var margin = {top: 20, right: 20, bottom: 30, left: 50},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;


    // set the ranges
    var x = d3.scaleTime().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    var i = -0.1;
    const MAX_COUNT = 30;
    var data = [];

    let yAxis = event;

    var valueline1,valueline2;
    if(event === "sincos"){
          valueline1 = d3.line()
          .x(function(d) { return x(d.x); })
          .y(function(d) { return y(d.sin); });
          valueline2 = d3.line()
          .x(function(d) { return x(d.x); })
          .y(function(d) { return y(d.cos); });
    } else if(event === "tancot"){
          valueline1 = d3.line()
          .x(function(d) { return x(d.x); })
          .y(function(d) { return y(d.tan); });
          valueline2 = d3.line()
          .x(function(d) { return x(d.x); })
          .y(function(d) { return y(d.cot); });
    } else{
          valueline1 = d3.line()
          .x(function(d) { return x(d.x); })
          .y(function(d) { return y(d[yAxis]); });
    }


    // append the svg obgect to the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    var svg = d3.select("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    function draw(data) {
        svg.selectAll("*").remove();
        let lineColor1,lineColor2;

        // Scale the range of the data
        x.domain(d3.extent(data, function(d) { return d.x; }));
        y.domain(d3.extent(data, function(d) {
          if(event === "tan") {
            if( d.tan > -0.8 && d.tan < 0.8) return d.tan;
          } else if(event === "cot"){
            if( d.cot > -0.8 && d.cot < 0.8) return d.cot;
          } else if(event === "sec"){
            if( d.sec > -5 && d.sec < 5)
            return d.sec;
          } else if(event === "tancot"){
            if( d.tan > -0.8 && d.tan < 0.8 && d.cot > -0.8 && d.cot < 0.8) return d.tan;
          } else if(event === "sincos"){
            return d.sin;
          } else return d[yAxis];
        }));

        if(event === "sin") lineColor1 = "green";
        if(event === "cos") lineColor1 = "red";
        if(event === "tan") lineColor1 = "blue";
        if(event === "cot") lineColor1 = "maroon";
        if(event === "sec") lineColor1 = "violet";
        if(event === "sincos") {
          lineColor1 = "green";
          lineColor2 = "red";
        };
        if(event === "tancot") {
          lineColor1 = "blue";
          lineColor2 = "maroon";
        };
//console.log(valueline.toString())
        // Add the valueline path.
        svg.append("path")
            .data([data])
            .attr("class", "line")
            .style("stroke", lineColor1)    // set the line colour
            .style("fill", "none")
            .attr("d", valueline1);

        if(event === "sincos" || event === "tancot"){
          svg.append("path")
              .data([data])
              .attr("class", "line")
              .style("stroke", lineColor2)    // set the line colour
              .style("fill", "none")
              .attr("d", valueline2);
        }



        // Add the X Axis
        svg.append("g")
            .attr("transform", "translate(0," + height/2 + ")")
            .call(d3.axisBottom(x));

        // Add the Y Axis
        svg.append("g")
            .call(d3.axisLeft(y));
    }


    function animate(i){
      if(event === "sin") data.push({"x":i,"sin":Math.sin(i)});
      if(event === "cos") data.push({"x":i,"cos":Math.cos(i)});
      if(event === "tan") data.push({"x":i,"tan":Math.tan(i)});
      if(event === "sec") data.push({"x":i,"sec":1/Math.cos(i+20)});
      if(event === "cot") data.push({"x":i,"cot": (1/Math.tan(i+20))});
      if(event === "sincos") data.push({"x":i,"sin":Math.sin(i),"cos":Math.cos(i+20.4)});
      if(event === "tancot") data.push({"x":i,"tan":Math.tan(i),"cot":1/Math.tan(i+40)});
      draw(data);
      processData();
    }

    function initSetTimeout(callback){
        setTimeout(callback, 10)
    }

    function processData(){
        i = i + 0.1;
        if(i<MAX_COUNT && start)
            initSetTimeout(animate.bind(this,i));
    }

    processData();
  }



}

  export default GraphCharts;
