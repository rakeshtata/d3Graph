import React from 'react';
import HistChart from '../visualizations/HistChart';
import '../history.css';

const History = () => {
    return (
            <div className="jumbotron">
            <h3>Hist Chart</h3>
              <HistChart/>
            </div>
    );

}

export default History;
