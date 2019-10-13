import React, {useEffect} from 'react';
import GraphActions from '../actions/GraphActions';

// App component - represents the whole app
function Graph() {

    useEffect(() => GraphActions.graph("sincos",false));

    const handleClick = (event) => {
      event.preventDefault();
       GraphActions.graph("sincos",true);
    }


      return (
          <div className="jumbotron">
          <h3>Cos and Sin Graph</h3>
            <div> <button type="button" className="btn btn-primary" onClick={handleClick}> Start </button> </div>
            <svg  id='chart' width="1200" height="240"></svg>
          </div>
  );

}

export default Graph;
