import * as d3 from 'd3';

const AppActions = {
  animate : (items,svg,index1,index2) => {
    const data = items;
    const width = 1000;
    const height = 220;
    const margin = {
        top: 20,
        right: 20,
        bottom: 30,
        left: 30
    }
    svg.selectAll("*").remove();
    let x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
        y = d3.scaleLinear().rangeRound([height, 0]);

    let g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    y.domain([0, 20]);
    x.domain(data.map(function (d) {
        return d;
    }));
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
        .attr("x", function (d) {
            return x(d);
        })
        .attr("y", function (d) {
            return y(d);
        })
        .attr("width", x.bandwidth())
        .attr("height", function (d) {
            return height - y(d);
        })
        .attr("fill", function(d){
          if(d == index2 || d == index1) return "red";
          else return "black";
        });

      g.selectAll("text.bar")
          .data(data)
          .enter().append("text")
          .attr("text-anchor", "end")
          .attr("x", function (d, i) {
               return x(d)+30;
          })
          .attr("y", function (d) {
              return y(d)+20;
          })
          .attr("font-family", "sans-serif")
          .attr("font-size", "11px")
          .attr("fill", "white")
          .text(function(d) { return d });


      }

}

export default AppActions;
