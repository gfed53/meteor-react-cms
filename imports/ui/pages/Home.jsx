import React, { Component } from 'react';
 
export default class Home extends Component {

	constructor(props) {
    super(props);
  }

  componentDidMount(){
  }

  componentWillUpdate(){
    console.log('componentWillUpdate');
  }

  componentWillReceiveProps(nextProps) {
    
  }

  detectUrlData(){
  }

  renderData(){
  }

  render() {
    return (
      <div>
        This is the homepage.
        
      </div>
    );
  }
}