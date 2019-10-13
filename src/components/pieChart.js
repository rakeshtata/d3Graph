import React, { useEffect} from 'react';
import PieCharAction from '../actions/PieCharAction';
import 'bootstrap/dist/css/bootstrap.css';

// App component - represents the whole app
function PieChart(){

    //const [start,setStart] = useState(false);

    useEffect(() => PieCharAction.chart(false));

    const handleClick = (event) => {
      event.preventDefault();
       PieCharAction.chart(true);
    }

    return (
            <div className="jumbotron">
            <h3>Pie Chart</h3>
              <div> <button type="button" className="btn btn-primary" onClick={handleClick}> Start </button> </div>
              <svg  id='chart' width="1200" height="240"></svg>
            </div>
    );

}

export default PieChart;
