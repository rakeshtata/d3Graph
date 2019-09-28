import React from 'react';
import App from './App';
import BubbleSort from "./components/BubbleSort";
import SelectionSort from "./components/SelectionSort";
import InsertionSort from "./components/InsertionSort";
import graph from "./components/graph";
import sine from "./components/sine";
import cosine from "./components/cosine";
import tangent from "./components/tangent";

export default [
  {
    ...App,
    routes: [
      {
        ...BubbleSort,
        path: '/bubbleSort',
      },
      {
        ...SelectionSort,
        path: '/selectionSort'
      },
      {
        ...InsertionSort,
        path: '/insertionSort'
      },
      {
        ...graph,
        path: '/graph'
      },
      {
        ...sine,
        path: '/sine'
      },
      {
        ...cosine,
        path: '/cosine'
      },
      {
        ...tangent,
        path: '/tangent'
      },
    ]
  }
]
