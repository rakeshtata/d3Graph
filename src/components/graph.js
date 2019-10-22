import React, {useState, useEffect} from "react";
import { MDBContainer, MDBInput } from "mdbreact";
import GraphActions from '../actions/GraphActions';
const gMap = {"1":"sin","2":"cos","3":"tan","4":"sincos"}

function InputPage() {
  const [radio,setRadio] = useState(2);
  useEffect(() => GraphActions.graph(gMap[radio],false));


  const handleClick = (id,event) =>  {
    setRadio(id);
  }

  const handleButtonClick = (event) =>  {
    event.preventDefault();
     GraphActions.graph(gMap[radio],true);
  }


  return (
    <div className="container">
      <div className="row sideNav">
        <div className="col-sm-12">

          <div> <button type="button" className="btn btn-primary btn-div" onClick={handleButtonClick}> Draw </button> </div>
          <form className="containerDiv">

            <div className="radio">
              <label>
                <input className="radioOption" onClick={(e) => handleClick("1", e)}  value="1" type="radio"  checked={radio==="1" ? true : false} />
                Y = sin X
              </label>
            </div>
            <div className="radio">
              <label>
                <input className="radioOption" type="radio" onClick={(e) => handleClick("2", e)}  value="2" checked={radio==="2" ? true : false}/>
                Y = cos X
              </label>
            </div>
            <div className="radio">
              <label>
                <input className="radioOption" type="radio" onClick={(e) => handleClick("3", e)}  value="3" checked={radio==="3" ? true : false}/>
                Y = tan X
              </label>
            </div>
            <div className="radio">
              <label>
                <input className="radioOption" type="radio" onClick={(e) => handleClick("4", e)}  value="4" checked={radio==="4" ? true : false}/>
                Y = cos X, Y = sin X
              </label>
            </div>
          </form>

        </div>
      </div>
      <div className="mainDiv">
        <svg  id='chart' width="1000" height="240"></svg>
      </div>
</div>
    );

}

export default InputPage;
