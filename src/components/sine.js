import React, { useEffect } from 'react';
import GraphActions from '../actions/GraphActions';

// App component - represents the whole app
function Sin(){

    useEffect(() => GraphActions.graph("sin",false));



    const handleClick = (event) => {
      event.preventDefault();
       GraphActions.graph("sin",true);
    }


    return (
        <div className="jumbotron">
        <h3>Sine Graph</h3>
          <div> <button type="button" className="btn btn-primary" onClick={handleClick}> Start </button> </div>
          <svg  id='chart' width="1200" height="240"></svg>
        </div>
      );

}

export default Sin;
