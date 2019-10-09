import React, {useState, useEffect} from 'react';
import * as d3 from 'd3';
import ReactDOM from 'react-dom';
import AppConstants from '../constants/AppConstants';
import PieCharAction from '../actions/PieCharAction';
import 'bootstrap/dist/css/bootstrap.css';

// App component - represents the whole app
function PieChart(){

    let [svg,start] = useState(AppConstants.INITIAL_STATE1);

    useEffect(() => PieCharAction.chart(this));

    const handleClick = (event) => {
      event.preventDefault();
       start = true;
       PieCharAction.chart(this);
    }

    return (
            <div class="jumbotron">
            <h3>Pie Chart</h3>
              <div> <button type="button" className="btn btn-primary" onClick={handleClick.bind(this)}> Start </button> </div>
              <svg  id='chart' width="1200" height="240"></svg>
            </div>
    );

}

export default PieChart;
