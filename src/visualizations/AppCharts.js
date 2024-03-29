import * as d3 from 'd3';
import React, { useEffect } from 'react';
import { useSelector } from "react-redux";

const AppCharts = () => {

  const animate = (data,pivot) => {
    const width = 1000;
    const height = 220;
    const margin = {
        top: 20,
        right: 20,
        bottom: 40,
        left: 10
    }

    d3.select('.svgDiv> *').remove();
    let svg = d3.select('.svgDiv').append('svg')
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .attr("style", 'margin-left:30%');


    let x = d3.scaleBand().rangeRound([0, width]).padding(0.1);
    let y = d3.scaleLinear().rangeRound([height, 0]);

    let g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    y.domain([0, 20]);
    x.domain(data);

    g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    g.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y))
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("Frequency");

    g.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", (d) => x(d))
        .attr("y", (d) => y(d))
        .attr("width", x.bandwidth())
        .attr("height",(d) => height - y(d))
        .attr("fill", (d) => "blue");

      g.selectAll("text.bar")
          .data(data)
          .enter().append("text")
          .attr("text-anchor", "end")
          .attr("x", (d, i) => x(d)+30)
          .attr("y", (d) => y(d)+20)
          .attr("font-family", "sans-serif")
          .attr("font-size", "11px")
          .attr("fill", "white")
          .text((d) => d );
  }

  const items = useSelector(state => state.item.items);
  const pivot = useSelector(state => state.item.pivot)


  useEffect(() => {
    items && animate(items,pivot)
  })

  return (
     <div  id='chart' className="svgDiv"/>
   )
}

export default AppCharts;
