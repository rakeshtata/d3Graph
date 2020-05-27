import React, {useState, useEffect} from "react";
import GraphCharts from '../visualizations/GraphCharts';
import { connect } from 'react-redux';
import { setRadio } from '../actions';
import { gMap } from '../actions';
import PropTypes from 'prop-types'

function InputPage({radio,handleClick}) {

  useEffect(() => GraphCharts.graph(gMap[radio],false));

  const handleButtonClick = (event) =>  {
    event.preventDefault();
     GraphCharts.graph(gMap[radio],true);
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
                <input className="radioOption" type="radio" onClick={(e) => handleClick("7", e)}  value="7" checked={radio==="7" ? true : false}/>
                Y = sec X
              </label>
            </div>
            <div className="radio">
              <label>
                <input className="radioOption" type="radio" onClick={(e) => handleClick("4", e)}  value="4" checked={radio==="4" ? true : false}/>
                Y = cos X, Y = sin X
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
                <input className="radioOption" type="radio" onClick={(e) => handleClick("5", e)}  value="5" checked={radio==="5" ? true : false}/>
                Y = cot X
              </label>
            </div>
            <div className="radio">
              <label>
                <input className="radioOption" type="radio" onClick={(e) => handleClick("6", e)}  value="6" checked={radio==="6" ? true : false}/>
                Y = tan X,Y = cot X
              </label>
            </div>
          </form>

        </div>
      </div>
      <div className="mainDiv">
        <svg  id='chart' className="graphSvgDiv"></svg>
      </div>
</div>
    );

}


InputPage.propTypes = {
  radio: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired
}

const mapStateToProps = (state,ownprops) => ({radio: state.radio})

const mapDispatchToProps = (dispatch) => ({
  handleClick: id =>  {
    dispatch(setRadio(id))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(InputPage)
