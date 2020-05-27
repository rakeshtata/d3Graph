import React from "react";
import BubbleSort from "./components/BubbleSort";
import SelectionSort from "./components/SelectionSort";
import InsertionSort from "./components/InsertionSort";
import graph from "./components/graph";
import pieChart from "./components/pieChart";
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import logo from './logo.svg';
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'

import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";


const options = [
  {
   type: 'group', name: 'Sorting', items: [
     { value: '/bubbleSort', label: 'Bubble Sort'},
     { value: '/selectionSort', label: 'Selection Sort' },
     { value: '/insertionSort', label: 'Insertion Sort' },
   ]
  },
  {
   type: 'group', name: 'Graphs', items: [
     { value: '/graph', label: 'Line Graph' }
   ]
 },
 {
  type: 'group', name: 'Pie Chart', items: [
    { value: '/pieChart', label: 'Pie Chart Spin'}
  ]
 }
]


function App()  {

  const _onSelect = (option) => {
    window.location.href=option.value;
  }

    return (
      <div className="App">
      <div>
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

          <Route path="/bubbleSort" component={BubbleSort} />
          <Route path="/selectionSort" component={SelectionSort} />
          <Route path="/insertionSort" component={InsertionSort} />
          <Route path="/graph" component={graph} />
          <Route path="/pieChart" component={pieChart} />
        </div>
      </Router>
      </div>
    );
}

export default App;
