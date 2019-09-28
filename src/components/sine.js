import React, { Component } from 'react';
import * as d3 from 'd3';
import ReactDOM from 'react-dom';
import GraphActions from '../actions/GraphActions';

// App component - represents the whole app
export default class Sin extends Component {

    state = {start: false};
    constructor(props) {
        super(props);
    }

    componentDidUpdate = () => {
      this.state.start = false;
      GraphActions.graph("sin",this);
    };


    componentDidMount = () => {
      this.state.start = false;
      GraphActions.graph("sin",this);
    };


    handleClick = (event) => {
      event.preventDefault();
       this.state.start = true;
       GraphActions.graph("sin",this);
    }

    render = () => {
        return (
            <div class="jumbotron">
            <h3>Sine Graph</h3>
              <div> <button type="button" className="btn btn-primary" onClick={this.handleClick.bind(this)}> Start </button> </div>
              <svg  id='chart' width="1200" height="240"></svg>
            </div>
          );
    }
}
