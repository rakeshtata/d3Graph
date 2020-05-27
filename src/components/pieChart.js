import React, { useEffect} from 'react';
import PieCharts from '../visualizations/PieCharts';
import 'bootstrap/dist/css/bootstrap.css';

// App component - represents the whole app
function PieChart(){

    //const [start,setStart] = useState(false);

    useEffect(() => PieCharts.chart(false));

    const handleClick = (event) => {
      event.preventDefault();
       PieCharts.chart(true);
    }

    return (
            <div className="jumbotron">
            <h3>Pie Chart</h3>
              <div> <button type="button" className="btn btn-primary" onClick={handleClick}> Start </button> </div>
              <svg  id='chart' className="pieDiv"></svg>
            </div>
    );

}

export default PieChart;
