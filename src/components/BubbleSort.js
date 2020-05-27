import React, {useState, useEffect} from 'react';
import * as d3 from 'd3';
import AppCharts from '../visualizations/AppCharts';
import AppConstants from '../constants/AppConstants';
import 'bootstrap/dist/css/bootstrap.css';

function BubbleSort() {

    const [start,setStart] = useState(false);
    let items,svg,pivot_i,pivot_j;

    const init = () => {
      items = [ ...AppConstants.ITEM_LIST ];
      svg = d3.select("svg");
      pivot_i = AppConstants.ITEM_LIST.length -1;
      setStart(false);
      bubbleSort();
    }

    useEffect(() => init());


    const bubbleSort = ()=> {
        AppCharts.animate(items,svg,items[pivot_i],items[pivot_j]);

        for (let j = (items.length - pivot_i); j > 0; j--) {
            //Compare the adjacent positions
            if (items[j] < items[j - 1]) {
                //Swap the numbers
                var tmp = items[j];
                items[j] = items[j - 1];
                items[j - 1] = tmp;
                pivot_j = j;
            }
        }
        pivot_i--;
        if(pivot_i >= 0 && start) setTimeout(bubbleSort.bind(this), 500);

    }

    const handleClick = (event) => {
      event.preventDefault();
       setStart(true);
       bubbleSort();
    }


        return (
            <div className="jumbotron">
            <h3>Bubble Sort</h3>
            <button type="button" className="btn btn-primary" onClick={handleClick.bind(this)}> Start </button>
            <svg  id='chart' className="svgDiv"></svg>
            </div>
    );

}

export default BubbleSort;
