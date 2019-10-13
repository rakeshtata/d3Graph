import React, {useEffect} from 'react';
import GraphActions from '../actions/GraphActions';
import 'bootstrap/dist/css/bootstrap.css';

// App component - represents the whole app
function Cos(){

  useEffect(() => GraphActions.graph("cos",false));


    const handleClick = (event) => {
      event.preventDefault();
       GraphActions.graph("cos",true);
    }


    return (
            <div className="jumbotron">
            <h3>Cosine Graph</h3>
              <div> <button type="button" className="btn btn-primary" onClick={handleClick}> Start </button> </div>
              <svg  id='chart' width="1200" height="240"></svg>
            </div>
    );

}

export default Cos;
