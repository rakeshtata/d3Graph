// import React from 'react';
// import logo from './logo.svg';
// import './App.css';
//
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }
//
// export default App;


import React, { Component } from "react";
import BubbleSort from "./components/BubbleSort";
import SelectionSort from "./components/SelectionSort";
import InsertionSort from "./components/InsertionSort";
import graph from "./components/graph";
import sine from "./components/sine";
import cosine from "./components/cosine";
import tangent from "./components/tangent";
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import logo from './logo.svg';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";

function App() {
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
        <ul className="list-group">
          <li className="list-group-item">
            <Link to="/bubbleSort">Bubble Sort</Link>
          </li>
          <li className="list-group-item">
            <Link to="/selectionSort">Selection Sort</Link>
          </li>
          <li className="list-group-item">
            <Link to="/insertionSort">insertion Sort</Link>
          </li>
          <li className="list-group-item">
            <Link to="/sine">Sine  Graph</Link>
          </li>
          <li className="list-group-item">
            <Link to="/cosine">Cos Graph</Link>
          </li>
          <li className="list-group-item">
            <Link to="/graph">Sine and Cos Graph</Link>
          </li>
          <li className="list-group-item">
            <Link to="/tangent">Tan Graph</Link>
          </li>
        </ul>
        <Route path="/bubbleSort" component={BubbleSort} />
        <Route path="/selectionSort" component={SelectionSort} />
        <Route path="/insertionSort" component={InsertionSort} />
        <Route path="/graph" component={graph} />
        <Route path="/sine" component={sine} />
        <Route path="/cosine" component={cosine} />
        <Route path="/tangent" component={tangent} />
      </div>
    </Router>
    </div>
  );
}

export default App;
