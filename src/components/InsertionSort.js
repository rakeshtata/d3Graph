import React, { Component } from 'react';
import * as d3 from 'd3';
import ReactDOM from 'react-dom';
import AppActions from '../actions/AppActions';
import AppConstants from '../constants/AppConstants';




// App component - represents the whole app
export default class App extends Component {
    state = AppConstants.INITIAL_STATE;

    constructor(props) {
        super(props);
    }

    init(){
      this.state.items = [ ...AppConstants.ITEM_LIST ];
      this.state.svg = d3.select("svg");
      this.state.length = AppConstants.ITEM_LIST.length;
      this.state.i = 0;
      this.state.start = false;
      this.insertionSort();
    }

    componentDidUpdate = () => this.init();


    componentDidMount = () => this.init();


    insertionSort() {
        AppActions.animate(this,this.state.items[this.state.i],this.state.items[this.state.j]);

        this.state.el = this.state.items[this.state.i];
        this.state.j = this.state.i;

        while(this.state.j>0 && this.state.items[this.state.j-1]>this.state.el){
            this.state.items[this.state.j] = this.state.items[this.state.j-1];
            this.state.j--;
        }
        if(this.state.i <= this.state.items.length && this.state.j < this.state.items.length){
          this.state.items[this.state.j] = this.state.el;
          this.state.i++;
          setTimeout(this.insertionSort.bind(this), 500);
        }

    }

    handleClick(event) {
      event.preventDefault();
       this.state.start = true;
       this.insertionSort();
    }


    render() {
        return (
            <div class="jumbotron">
        <button type="button" className="btn btn-primary" onClick={this.handleClick.bind(this)}> Start </button>
        <svg  id='chart' width="1200" height="240"></svg>
            </div>
    );
    }
}
