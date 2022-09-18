import * as d3 from 'd3';
import React, { useEffect } from 'react';
import { useSelector } from "react-redux";

const PieCharts = () => {

  const draw = (colArr) => {

      d3.select('.psvgDiv> *').remove();
      var width = 450;
      var height = 450;
      var margin = 40;


      var radius = Math.min(width, height) / 2 - margin;


      var data = {a: 10, b: 10, c:10, d:10, e:10,f:10}

      var svg = d3.select('.psvgDiv').append('svg')
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
        .range(colArr)
      svg
        .selectAll('whatever')
        .data(data_ready)
        .enter()
        .append('path')
        .attr('d', d3.arc()
          .innerRadius(40)
          .outerRadius(radius)
        )
        .attr('fill', function(d){ return(color(d.data.key)) })
        .attr("stroke", "black")
        .style("stroke-width", "2px")
        .style("opacity", 0.7)
  }

  const colorArr = useSelector(state => state.pie.pColorlist);

  useEffect(() => {
    colorArr && draw(colorArr)
  })

  return (
     <div  id='pie' className="psvgDiv"/>
   )



}

  export default PieCharts;
