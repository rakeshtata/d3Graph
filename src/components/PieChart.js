import React from 'react';
import PieCharts from '../visualizations/PieCharts';
import 'bootstrap/dist/css/bootstrap.css';
import { useDispatch } from "react-redux";
import constants from '../constants/AppConstants'

// App component - represents the whole app
const PieChart = () => {

    const dispatch = useDispatch();
    const colors = constants.COLORS;
    const handleClick = (event) => {
      event.preventDefault();
       dispatch({type:"PIE",colors});
    }

    return (
            <div className="jumbotron">
            <h3>Spin Game</h3>
              <div> <button type="button" className="btn btn-primary" onClick={handleClick}> Start </button> </div>
              <PieCharts/>
            </div>
    );

}

export default PieChart;
