import * as d3 from 'd3';
import React, { useEffect } from 'react';
import { useSelector } from "react-redux";



const GraphCharts = () => {

    const draw = (data,event) =>{
        d3.select('.gsvgDiv> *').remove();
        var margin = {top: 20, right: 20, bottom: 30, left: 50},
            width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;
        let svg =  d3.select('.gsvgDiv').append('svg')
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

        let lineColor1,lineColor2;

        // set the ranges
        var x = d3.scaleTime().range([0, width]);
        var y = d3.scaleLinear().range([height, 0]);

        let yAxis = event;

        var valueline1,valueline2;
        if(event === "COS_SIN"){
              valueline1 = d3.line()
              .x(function(d) { return x(d.x); })
              .y(function(d) { return y(d.SINE); });
              valueline2 = d3.line()
              .x(function(d) { return x(d.x); })
              .y(function(d) { return y(d.COS); });
        } else if(event === "TAN_COT"){
              valueline1 = d3.line()
              .x(function(d) { return x(d.x); })
              .y(function(d) { return y(d.TAN); });
              valueline2 = d3.line()
              .x(function(d) { return x(d.x); })
              .y(function(d) { return y(d.COT); });
        } else{
              valueline1 = d3.line()
              .x(function(d) {
                return x(d.x); })
              .y(function(d) { return y(d[yAxis]); });
        }

        // Scale the range of the data
        x.domain(d3.extent(data, function(d) { return d.x; }));
        y.domain(d3.extent(data, function(d) {
          if(event === "TAN") {
            if( d.TAN > -0.8 && d.TAN < 0.8) return d.TAN;
          } else if(event === "COT"){
            if( d.COT > -0.8 && d.COT < 0.8) return d.COT;
          } else if(event === "SEC"){
            if( d.SEC > -5 && d.SEC < 5)
            return d.SEC;
          } else if(event === "TAN_COT"){
            if( d.TAN > -0.8 && d.TAN < 0.8 && d.COT > -0.8 && d.COT < 0.8) return d.TAN;
          } else if(event === "COS_SIN"){
            return d.SINE;
          } else return d[yAxis];
        }));

        if(event === "SINE") lineColor1 = "green";
        if(event === "COS") lineColor1 = "red";
        if(event === "TAN") lineColor1 = "blue";
        if(event === "COT") lineColor1 = "maroon";
        if(event === "SEC") lineColor1 = "violet";
        if(event === "COS_SIN") {
          lineColor1 = "green";
          lineColor2 = "red";
        };
        if(event === "TAN_COT") {
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

        if(event === "COS_SIN" || event === "TAN_COT"){
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



  const data = useSelector(state => state.graph.glist);
  const event = useSelector(state => state.graph.event);


  useEffect(() => {
    data && draw(data,event)
  })

  return (
     <div  id='graph' className="gsvgDiv"/>
   )



}

  export default GraphCharts;
