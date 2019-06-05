import React, { Component } from 'react';
import * as d3 from 'd3';
import ReactDOM from 'react-dom';
import GraphActions from '../actions/GraphActions';

// App component - represents the whole app
export default class Graph extends Component {

    state = {svg: {}};
    constructor(props) {
        super(props);
    }

    componentDidUpdate = () => {
      this.state.start = false;
      GraphActions.graph("sincos",this);
    };


    componentDidMount = () => {
      this.state.start = false;
      GraphActions.graph("sincos",this);
    };



    handleClick(event) {
      event.preventDefault();
       this.state.start = true;
       GraphActions.graph("sincos",this);
    }

    render() {
        return (
            <div class="jumbotron">
              <div> <button type="button" className="btn btn-primary" onClick={this.handleClick.bind(this)}> Start </button> </div>
        <svg  id='chart' width="1200" height="240"></svg>
            </div>
    );
    }
}
