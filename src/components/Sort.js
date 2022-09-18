import React, {useState, useEffect} from 'react';
import AppCharts from '../visualizations/AppCharts';
import 'bootstrap/dist/css/bootstrap.css';
import { useDispatch } from "react-redux";
import { fetchData, setStart } from "../store/sortReducer";
import constants from '../constants/AppConstants'

const Sort = () => {

    const [radio,setRadio] = useState("1");
    const dispatch = useDispatch();
    const items = [...constants.INIT_ITEM_LIST];


    const sort = () => {
      dispatch(setStart(true));
      dispatch(fetchData(items));
      if(radio === "1") dispatch({type: "BUBBLE_SORT",items});
      if(radio === "2") dispatch({type: "INSERTION_SORT",items});
      if(radio === "3") dispatch({type: "SELECTION_SORT",items});
    }

    useEffect(() => {
      dispatch(setStart(false));
      dispatch(fetchData(items));
    },[radio]);


    const handleClick = (event) => {
      event.preventDefault();
      sort();
    }


        return (
            <div className="jumbotron">
            <div>
              <AppCharts/>
            </div>
              <div >
                <div className="col-sm-12">

                  <div> <button type="button" className="btn btn-primary" onClick={handleClick}> Start </button> </div>
                  <form className="containerDiv">

                    <div className="radio">
                      <label>
                        <input className="radioOption" onClick={(e) => setRadio("1")}  value="1" type="radio"  checked={radio==="1" ? true : false} />
                        Bubble Sort
                      </label>
                    </div>
                    <div className="radio">
                      <label>
                        <input className="radioOption" type="radio" onClick={(e) => setRadio("2")}  value="2" checked={radio==="2" ? true : false}/>
                        Insersion Sort
                      </label>
                    </div>
                    <div className="radio">
                      <label>
                        <input className="radioOption" type="radio" onClick={(e) => setRadio("3")}  value="3" checked={radio==="3" ? true : false}/>
                        Selection Sort
                      </label>
                    </div>
                  </form>

                </div>
              </div>
        </div>
    );

}

export default Sort;
