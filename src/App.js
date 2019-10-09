import React from "react";
import BubbleSort from "./components/BubbleSort";
import SelectionSort from "./components/SelectionSort";
import InsertionSort from "./components/InsertionSort";
import graph from "./components/graph";
import sine from "./components/sine";
import cosine from "./components/cosine";
import tangent from "./components/tangent";
import pieChart from "./components/pieChart"
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import logo from './logo.svg';
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'


import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
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
     { value: '/sine', label: 'Sine'},
     { value: '/cosine', label: 'Cosine' },
     { value: '/tangent', label: 'Tangent' },
     { value: '/graph', label: 'Sine and Cos Graph' }
   ]
 },
 {
  type: 'group', name: 'Pie Chart', items: [
    { value: '/pieChart', label: 'Pie Chart'}
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
          <tr>
            <th scope="col"><img src={logo} className="App-logo float-left" alt="logo" /></th>
            <th scope="col"><h1 className="mx-auto d-block"> D3 Animation </h1></th>
            <th scope="col"><img src={logo} className="App-logo float-right" alt="logo" /></th>
          </tr>
        </table>
      </div>
      <Router>
        <div className="jumbotron">

        <Dropdown className="options" onChange={_onSelect} options={options}  placeholder="Select an option" />

          <Route path="/bubbleSort" component={BubbleSort} />
          <Route path="/selectionSort" component={SelectionSort} />
          <Route path="/insertionSort" component={InsertionSort} />
          <Route path="/graph" component={graph} />
          <Route path="/sine" component={sine} />
          <Route path="/cosine" component={cosine} />
          <Route path="/tangent" component={tangent} />
          <Route path="/pieChart" component={pieChart} />
        </div>
      </Router>
      </div>
    );
}

export default App;
