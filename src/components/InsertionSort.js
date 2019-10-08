import React, {useState, useEffect} from 'react';
import * as d3 from 'd3';
import ReactDOM from 'react-dom';
import AppActions from '../actions/AppActions';
import AppConstants from '../constants/AppConstants';




// App component - represents the whole app
function InsertionSort() {
    let [items, svg,item_length,pivot_i,value,el,pivot_j,start] = useState(AppConstants.INITIAL_STATE1);



    const init = () =>{
      items = [ ...AppConstants.ITEM_LIST ];
      svg = d3.select("svg");
      item_length = AppConstants.ITEM_LIST.length;
      pivot_i = 0;
      start = false;
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
       start = true;
       insertionSort();
    }



  return (
            <div class="jumbotron">
            <h3>Insertion Sort</h3>
            <button type="button" className="btn btn-primary" onClick={handleClick.bind(this)}> Start </button>
            <svg  id='chart' width="1200" height="240"></svg>
            </div>
    );

}
export default InsertionSort;
