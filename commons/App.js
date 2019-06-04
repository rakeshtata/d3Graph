import React, { Component } from "react";
import BubbleSort from "./components/BubbleSort";
import SelectionSort from "./components/SelectionSort";
import InsertionSort from "./components/InsertionSort";
import graph from "./components/graph";
import sine from "./components/sine";
import cosine from "./components/cosine";
import tangent from "./components/tangent";

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";

function App() {
  return (
    <div><h1> Animations </h1>
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/bubbleSort">Bubble Sort</Link>
          </li>
          <li>
            <Link to="/selectionSort">Selection Sort</Link>
          </li>
          <li>
            <Link to="/insertionSort">insertion Sort</Link>
          </li>
          <li>
            <Link to="/sine">Sine  Graph</Link>
          </li>
          <li>
            <Link to="/cosine">Cos Graph</Link>
          </li>
          <li>
            <Link to="/graph">Sine and Cos Graph</Link>
          </li>
          <li>
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
