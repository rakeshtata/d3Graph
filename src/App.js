import React from "react";
import Sort from "./components/Sort";
import Graph from "./components/Graph";
import PieChart from "./components/PieChart";
import History from "./components/History";
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import logo from './logo.svg';
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'

import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";


const options = [
  {
   type: 'group', name: 'Sorting', items: [
     { value: '/Sort', label: 'Sort'}
   ]
  },
  {
   type: 'group', name: 'Graphs', items: [
     { value: '/graph', label: 'Line Graph' }
   ]
 },
 {
  type: 'group', name: 'Spin Game', items: [
    { value: '/pieChart', label: 'Spin Game'}
  ]
},
{
 type: 'group', name: 'History', items: [
   { value: '/history', label: 'history'}
 ]
}
]


function App()  {

  const _onSelect = (option) => {
    window.location.href=option.value;
  }

    return (
      <div className="App">
      <div className="pageHeader">
        <table className="table">
        <tbody>
          <tr>
            <th scope="col"><img src={logo} className="App-logo float-left" alt="logo" /></th>
            <th scope="col"><h1 className="mx-auto d-block"> D3 Animation </h1></th>
            <th scope="col"><img src={logo} className="App-logo float-right" alt="logo" /></th>
          </tr>
          </tbody>
        </table>
      </div>
      <Router>
        <div className="jumbotron">

        <Dropdown className="options dropDownDiv" onChange={_onSelect} options={options}  placeholder="Select an option" />
        <Routes>

          <Route path="Sort" element={<Sort/>} />
          <Route path="graph" element={<Graph/>} />
          <Route path="pieChart" element={<PieChart/>} />
          <Route path="history" element={<History/>} />
        </Routes>
        </div>
      </Router>
      </div>
    );
}

export default App;
