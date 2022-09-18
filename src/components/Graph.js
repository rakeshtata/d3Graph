import React, { useEffect, useState} from "react";
import GraphCharts from '../visualizations/GraphCharts';
import { useDispatch } from "react-redux";
import { setGStart, resetGlist, setGEvent} from "../store/graphReducer";

const Graph = () => {
  const [radio,setRadio] = useState("1");
  const dispatch = useDispatch();

  const graphChart = () => {
    dispatch(setGStart(true));
    dispatch(resetGlist());
    dispatch({type:"GRAPH"});
  }

  useEffect(() => {
    dispatch(setGStart(false));
    dispatch(resetGlist());
    if(radio === "1") dispatch(setGEvent("SINE"));
    if(radio === "2") dispatch(setGEvent("COS"));
    if(radio === "3") dispatch(setGEvent("TAN"));
    if(radio === "4") dispatch(setGEvent("COS_SIN"));
    if(radio === "5") dispatch(setGEvent("COT"));
    if(radio === "6") dispatch(setGEvent("TAN_COT"));
    if(radio === "7") dispatch(setGEvent("SEC"));
  },[radio]);

  const handleClick = (event) => {
    event.preventDefault();
    graphChart();
  }


  return (
    <div className="container">
      <div className="row sideNav">
        <div className="col-sm-12">

          <div> <button type="button" className="btn btn-primary btn-div" onClick={handleClick}> Draw </button> </div>
          <form className="containerDiv">

            <div className="radio">
              <label>
                <input className="radioOption" onClick={(e) => setRadio("1")}  value="1" type="radio"  checked={radio==="1" ? true : false} />
                Y = sin X
              </label>
            </div>
            <div className="radio">
              <label>
                <input className="radioOption" type="radio" onClick={(e) => setRadio("2")}  value="2" checked={radio==="2" ? true : false}/>
                Y = cos X
              </label>
            </div>
            <div className="radio">
              <label>
                <input className="radioOption" type="radio" onClick={(e) =>setRadio("7")}  value="7" checked={radio==="7" ? true : false}/>
                Y = sec X
              </label>
            </div>
            <div className="radio">
              <label>
                <input className="radioOption" type="radio" onClick={(e) => setRadio("4")}  value="4" checked={radio==="4" ? true : false}/>
                Y = cos X, Y = sin X
              </label>
            </div>
            <div className="radio">
              <label>
                <input className="radioOption" type="radio" onClick={(e) => setRadio("3")}  value="3" checked={radio==="3" ? true : false}/>
                Y = tan X
              </label>
            </div>
            <div className="radio">
              <label>
                <input className="radioOption" type="radio" onClick={(e) => setRadio("5")}  value="5" checked={radio==="5" ? true : false}/>
                Y = cot X
              </label>
            </div>
            <div className="radio">
              <label>
                <input className="radioOption" type="radio" onClick={(e) => setRadio("6")}  value="6" checked={radio==="6" ? true : false}/>
                Y = tan X,Y = cot X
              </label>
            </div>
          </form>

        </div>

      </div>
      <div className="mainDiv">
        <GraphCharts/>
      </div>

</div>
    );

}

export default Graph;
