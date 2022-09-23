import * as d3 from 'd3';
import React, { useEffect } from 'react';
import chroma from "chroma-js";
import constants from "../constants/AppConstants";

const HistCharts = () => {

  const draw = () => {

    // To get the event positio05
    const keyFunction =  (d) => d.startdate + d.type;

    const histData = constants.HISTORY_DATE;

    const container = d3.select("body");
    d3.select('.hsvgDiv> *').remove();

    const svg = d3.select('.hsvgDiv').append('svg');

    svg.attr("width","1060");
    svg.attr("height","500");


    const margin = {
            top: 20,
            right: 25,
            bottom: 110,
            left: 50
        };
    const margin2 = {
            top: 430,
            right: 25,
            bottom: 30,
            left: 50
        };
    const width = 960 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;
    const height2 = 500 - margin2.top - margin2.bottom;


    // Define the div for the tooltip
    const tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")

    const x = d3.scaleLinear()
        .domain([d3.min(histData, (d) => d.startdate), d3.max(histData, (d) => d.enddate)])
        .range([0, width]);
    const x2 = d3.scaleLinear().range([0, width]);
        // y = d3.scaleOrdinal().range([height, 0]),
    const y2 = d3.scaleLinear().range([height2, 0]);

    const y = d3.scaleBand()
        .domain(histData.map((entry)=> entry.type))
        .rangeRound([height, 0])

    // colors for each type
    const types = [...new Set(histData.map(item => item.type))];
    const colors = chroma.scale('Spectral').colors(types.length)
    let type2color = {}
    types.forEach((element, index) => {
        type2color[element] = colors[index]
    });

    const rectTransform =  (d) => "translate(" + x(d.startdate) + "," + y(d.type) + ")";

    const xAxis = d3.axisBottom(x);
    const xAxis2 = d3.axisBottom(x2);
    const yAxis = d3.axisLeft(y).tickSize(0);



    const brushed = () => {
        if (d3.event.sourceEvent && d3.event.sourceEvent.type === "zoom") return; // ignore brush-by-zoom
        let s = d3.event.selection || x2.range();
        x.domain(s.map(x2.invert, x2));
        area.selectAll(".circle").attr("transform", rectTransform)
            .attr("width", (d) => x(d.enddate) - x(d.startdate))
        //   focus.select(".focus").attr("d", focus);
        focus.select(".axis--x").call(xAxis);
        svg.select(".zoom").call(zoom.transform, d3.zoomIdentity
            .scale(width / (s[1] - s[0]))
            .translate(-s[0], 0));
    }

    const zoomed = ()=> {
        if (d3.event.sourceEvent && d3.event.sourceEvent.type === "brush") return; // ignore zoom-by-brush
        var t = d3.event.transform;
        x.domain(t.rescaleX(x2).domain());
        area.selectAll(".circle").attr("transform", rectTransform)
            .attr("width",(d) => x(d.enddate) - x(d.startdate))
        //   focus.select(".area").attr("d", area);
        focus.select(".axis--x").call(xAxis);
        context.select(".brush").call(brush.move, x.range().map(t.invertX, t));
    }

    const brush = d3.brushX()
        .extent([
            [0, 0],
            [width, height2]
        ])
        .on("brush end", () => container.on('brushed', brushed));

    const zoom = d3.zoom()
        .scaleExtent([1, Infinity])
        .translateExtent([
            [0, 0],
            [width, height]
        ])
        .extent([
            [0, 0],
            [width, height]
        ])
        .on("zoom", zoomed);


    svg.append("rect")
        .attr("class", "zoom")
        .attr("width", width)
        .attr("height", height)
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .call(zoom);

    svg.append("defs").append("clipPath")
        .attr("id", "clip")
        .append("rect")
        .attr("width", width)
        .attr("height", height)


    const area = svg.append("g")
        .attr('class', 'clipped')
        .attr("width", width)
        .attr("height", height)
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    const focus = svg.append("g")
        .attr("class", "focus")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    area.selectAll(".circle")
        .data(histData, keyFunction).enter()
        .append("rect")
        .attr("rx", 5)
        .attr("ry", 5)
        .attr("class", "circle")
        .attr("y", 0)
        .attr("transform", rectTransform)
        .attr("height", (d) => y.bandwidth())
        .attr("width", (d) => x(d.enddate) - x(d.startdate))
        .style("fill", (d) => type2color[d.type])
        .on("mouseover", (d) => {
            tooltip
                .style("left", d3.event.pageX + "px")
                .style("top", d3.event.pageY + "px")
                .style("display", "inline-block")
                .html((d.type) + "<br> from :" + d.startdate+ "<br> to :" + d.enddate
                    .toISOString().slice(0, 19));
        })
        .on("mouseout", (d) => {
            tooltip.style("display", "none")
        });

    const area2 = d3.area()
        .curve(d3.curveMonotoneX)
        .x((d) =>  x2(d.startdate))
        .y0(height2);


    const context = svg.append("g")
        .attr("class", "context")
        .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");


    x2.domain(x.domain());
    y2.domain(y.domain());

    focus.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    focus.append("g")
        .attr("class", "axis axis--y")
        .call(yAxis);

    context.append("path")
        .datum(histData)
        .attr("class", "area")
        .attr("d", area2);

    context.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height2 + ")")
        .call(xAxis2);

    context.append("g")
        .attr("class", "brush")
        .call(brush)
        .call(brush.move, x.range());

  }

  useEffect(() => {
    draw()
  })

  return (
     <div  id='hist' className="hsvgDiv" width="960" height="500"/>
   )
}

export default HistCharts;
