import React, {useState, useEffect} from 'react';
import * as d3 from 'd3';
import AppActions from '../actions/AppActions';
import AppConstants from '../constants/AppConstants';




// App component - represents the whole app
function InsertionSort() {
    const [start,setStart] = useState(false);
    let items,svg,pivot_i,pivot_j,el;



    const init = () =>{
      items = [ ...AppConstants.ITEM_LIST ];
      svg = d3.select("svg");
      pivot_i = 0;
      setStart(false);
      insertionSort();
    }

    useEffect(() => init());


    const insertionSort = () => {
        AppActions.animate(items,svg,items[pivot_i],items[pivot_j]);

        el = items[pivot_i];
        pivot_j = pivot_i;

        while(pivot_j>0 && items[pivot_j-1]>el){
            items[pivot_j] = items[pivot_j-1];
            pivot_j--;
        }
        if(pivot_i <= items.length && pivot_j < items.length && start){
          items[pivot_j] = el;
          pivot_i++;
          setTimeout(insertionSort.bind(this), 500);
        }

    }

    const handleClick = (event) =>{
      event.preventDefault();
       setStart(true);
       insertionSort();
    }



  return (
            <div className="jumbotron">
            <h3>Insertion Sort</h3>
            <button type="button" className="btn btn-primary" onClick={handleClick.bind(this)}> Start </button>
            <svg  id='chart' className="svgDiv"></svg>
            </div>
    );

}
export default InsertionSort;
