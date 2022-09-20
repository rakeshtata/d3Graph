import * as d3 from 'd3';
import React, { useEffect } from 'react';
import chroma from "chroma-js";
import constants from "../constants/AppConstants";

const HistCharts = () => {

  const draw = () => {

    // To get the event positio05
    var keyFunction = function (d) {
        return d.startdate + d.type;
    }

    const histData = constants.HISTORY_DATE;

    var container = d3.select("body");
    d3.select('.hsvgDiv> *').remove();

    var svg = d3.select('.hsvgDiv').append('svg');

    svg.attr("width","1060");
    svg.attr("height","500");


    var margin = {
            top: 20,
            right: 25,
            bottom: 110,
            left: 50
        },
        margin2 = {
            top: 430,
            right: 25,
            bottom: 30,
            left: 50
        },
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom,
        height2 = 500 - margin2.top - margin2.bottom;


    // Define the div for the tooltip
    var tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")

    var x = d3.scaleLinear()
        .domain([d3.min(histData, function (d) {
            return d.startdate;
        }), d3.max(histData, function (d) {
            return d.enddate;
        })])
        .range([0, width]),
        x2 = d3.scaleLinear().range([0, width]),
        // y = d3.scaleOrdinal().range([height, 0]),
        y2 = d3.scaleLinear().range([height2, 0]);

    var y = d3.scaleBand()
        .domain(histData.map(function (entry) {
            return entry.type;
        }))
        .rangeRound([height, 0])

    // colors for each type
    var types = [...new Set(histData.map(item => item.type))];
    var colors = chroma.scale('Spectral').colors(types.length)
    var type2color = {}
    types.forEach(function (element, index) {
        type2color[element] = colors[index]
    });

    var rectTransform = function (d) {
        return "translate(" + x(d.startdate) + "," + y(d.type) + ")";
    };

    var xAxis = d3.axisBottom(x),
        xAxis2 = d3.axisBottom(x2),
        yAxis = d3.axisLeft(y).tickSize(0);



        function brushed() {
            if (d3.event.sourceEvent && d3.event.sourceEvent.type === "zoom") return; // ignore brush-by-zoom
            let s = d3.event.selection || x2.range();
            x.domain(s.map(x2.invert, x2));
            area.selectAll(".circle").attr("transform", rectTransform)
                .attr("width", function (d) {
                    return (x(d.enddate) - x(d.startdate))
                })
            //   focus.select(".focus").attr("d", focus);
            focus.select(".axis--x").call(xAxis);
            svg.select(".zoom").call(zoom.transform, d3.zoomIdentity
                .scale(width / (s[1] - s[0]))
                .translate(-s[0], 0));
        }

        function zoomed(){
            if (d3.event.sourceEvent && d3.event.sourceEvent.type === "brush") return; // ignore zoom-by-brush
            var t = d3.event.transform;
            x.domain(t.rescaleX(x2).domain());
            area.selectAll(".circle").attr("transform", rectTransform)
                .attr("width", function (d) {
                    return (x(d.enddate) - x(d.startdate))
                })
            //   focus.select(".area").attr("d", area);
            focus.select(".axis--x").call(xAxis);
            context.select(".brush").call(brush.move, x.range().map(t.invertX, t));
        }

    var brush = d3.brushX()
        .extent([
            [0, 0],
            [width, height2]
        ])
        .on("brush end", function() {
          container.on('brushed', brushed)
        });



    var zoom = d3.zoom()
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


    var area = svg.append("g")
        .attr('class', 'clipped')
        .attr("width", width)
        .attr("height", height)
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    var focus = svg.append("g")
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
        .attr("height", function (d) {
            return y.bandwidth();
        })
        .attr("width", function (d) {
            return (x(d.enddate) - x(d.startdate))
        })
        .style("fill", function (d) {
            return type2color[d.type]
        })
        .on("mouseover", function (d) {
            tooltip
                .style("left", d3.event.pageX + "px")
                .style("top", d3.event.pageY + "px")
                .style("display", "inline-block")
                .html((d.type) + "<br> from :" + d.startdate+ "<br> to :" + d.enddate
                    .toISOString().slice(0, 19));
        })
        .on("mouseout", function (d) {
            tooltip.style("display", "none")
        });

    var area2 = d3.area()
        .curve(d3.curveMonotoneX)
        .x(function (d) {
            return x2(d.startdate);
        })
        .y0(height2);


    var context = svg.append("g")
        .attr("class", "context")
        .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");

    var data = histData

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
        .datum(data)
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
