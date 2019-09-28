import React, { Component } from 'react';
import * as d3 from 'd3';
import ReactDOM from 'react-dom';
import AppActions from '../actions/AppActions';
import AppConstants from '../constants/AppConstants';
import 'bootstrap/dist/css/bootstrap.css';
//import { Button } from 'reactstrap';

// App component - represents the whole app
export default class BubbleSort extends Component {
    state = AppConstants.INITIAL_STATE;

    constructor(props) {
        super(props);
    }

    init(){
      this.state.items = [ ...AppConstants.ITEM_LIST ];
      this.state.svg = d3.select("svg");
      this.state.length = AppConstants.ITEM_LIST.length;
      this.state.i = AppConstants.ITEM_LIST.length -1;
      this.state.start = false;
      this.bubbleSort();
    }

    componentDidUpdate = () => this.init();


    componentDidMount = () => this.init();

    bubbleSort() {
        AppActions.animate(this,this.state.items[this.state.i],this.state.items[this.state.j]);

        for (let j = (this.state.length - this.state.i); j > 0; j--) {
            //Compare the adjacent positions
            if (this.state.items[j] < this.state.items[j - 1]) {
                //Swap the numbers
                var tmp = this.state.items[j];
                this.state.items[j] = this.state.items[j - 1];
                this.state.items[j - 1] = tmp;
                this.state.j = j;
            }
        }
        this.state.i--;
        if(this.state.i >= 0 && this.state.start) setTimeout(this.bubbleSort.bind(this), 500);

    }
    handleClick(event) {
      event.preventDefault();
       this.state.start = true;
       this.bubbleSort();
    }

    render() {
        return (
            <div class="jumbotron">
            <h3>Bubble Sort</h3>
            <button type="button" className="btn btn-primary" onClick={this.handleClick.bind(this)}> Start </button>
        <svg  id='chart' width="1200" height="240"></svg>
            </div>
    );
    }
}
